#!/usr/bin/env python3
"""
Unified localization management script for standardizing key order and analyzing differences.
Outputs detailed reports to report.txt with timestamps.
"""

import json
import os
from pathlib import Path
from typing import Dict, Any, List

from datetime import datetime


class LocalizationManager:
    def __init__(self, messages_dir: Path, report_file: Path = None):
        self.messages_dir = messages_dir
        self.report_file = report_file or messages_dir / "changes.md"
        self.reference_file = messages_dir / 'en.json'
        self.backup_file = messages_dir / 'en.json.bak'
        self.reference_data = None
        self.reference_keys = None
        self.report_lines = []
        self.changes_made = []
        self.changed_english_values = {}
        self.backup_data = None  # Store backup data for reporting
        
    def log(self, message: str, print_also: bool = True):
        """Add message to report and optionally print to console."""
        self.report_lines.append(message)
        if print_also:
            print(message)
    
    def load_json_file(self, file_path: Path) -> Dict[str, Any]:
        """Load and parse a JSON file."""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception as e:
            self.log(f"❌ Error loading {file_path}: {e}")
            return {}
    
    def save_json_file(self, file_path: Path, data: Dict[str, Any]) -> None:
        """Save data to a JSON file with consistent formatting."""
        try:
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2, separators=(',', ': '))
                f.write('\n')  # Add trailing newline
            self.log(f"✓ Updated {file_path.name}")
        except Exception as e:
            self.log(f"❌ Error saving {file_path}: {e}")
    
    def get_ordered_keys(self, obj: Dict[str, Any], prefix: str = "") -> List[str]:
        """Get all nested keys from a dictionary in dot notation, preserving order."""
        keys = []
        if isinstance(obj, dict):
            for key in obj.keys():
                full_key = f"{prefix}.{key}" if prefix else key
                keys.append(full_key)
                keys.extend(self.get_ordered_keys(obj[key], full_key))
        return keys
    
    def get_nested_value(self, obj: Dict[str, Any], key_path: str, default: Any = None) -> Any:
        """Get a nested value from a dictionary using dot notation."""
        keys = key_path.split('.')
        current = obj
        
        try:
            for key in keys:
                current = current[key]
            return current
        except (KeyError, TypeError):
            return default
    
    def set_nested_value(self, obj: Dict[str, Any], key_path: str, value: Any) -> None:
        """Set a nested value in a dictionary using dot notation."""
        keys = key_path.split('.')
        current = obj
        
        # Navigate to the parent of the target key
        for key in keys[:-1]:
            if key not in current:
                current[key] = {}
            current = current[key]
        
        # Set the final value
        current[keys[-1]] = value
    
    def reorder_dict_by_reference(self, source_dict: Dict[str, Any], reference_dict: Dict[str, Any], prefix: str = "") -> Dict[str, Any]:
        """Reorder a dictionary to match the key order of a reference dictionary."""
        result = {}
        
        # First, add all keys that exist in the reference in the same order
        for key in reference_dict.keys():
            full_key = f"{prefix}.{key}" if prefix else key
            
            if key in source_dict:
                if isinstance(reference_dict[key], dict) and isinstance(source_dict[key], dict):
                    # Recursively reorder nested dictionaries
                    result[key] = self.reorder_dict_by_reference(source_dict[key], reference_dict[key], full_key)
                else:
                    result[key] = source_dict[key]
            else:
                # Key missing in source - use English value as placeholder
                if isinstance(reference_dict[key], dict):
                    result[key] = self.reorder_dict_by_reference({}, reference_dict[key], full_key)
                else:
                    result[key] = reference_dict[key]  # Use English value as placeholder
                    self.changes_made.append(f"Added missing key `{full_key}`: `\"\"` → `\"{reference_dict[key]}\"`")
        
        return result
    
    def analyze_file(self, locale_file: Path) -> Dict[str, Any]:
        """Analyze a single localization file against the reference."""
        locale_data = self.load_json_file(locale_file)
        if not locale_data:
            return {"error": f"Failed to load {locale_file.name}"}
        
        locale_keys = self.get_ordered_keys(locale_data)
        
        # Check key order match
        keys_match = locale_keys == self.reference_keys
        
        # Find differences
        source_keys_set = set(locale_keys)
        reference_keys_set = set(self.reference_keys)
        
        missing_keys = sorted(list(reference_keys_set - source_keys_set))
        extra_keys = sorted(list(source_keys_set - reference_keys_set))
        
        # Check for empty values that should have English placeholders
        empty_values = []
        for key_path in self.reference_keys:
            # Only check leaf nodes (keys that don't have child objects)
            reference_value = self.get_nested_value(self.reference_data, key_path)
            if not isinstance(reference_value, dict):  # This is a leaf node
                locale_value = self.get_nested_value(locale_data, key_path)
                if (locale_value == "" or locale_value is None) and reference_value and reference_value != "":
                    empty_values.append(key_path)
        
        # Find first order difference
        first_diff = None
        if not keys_match:
            for i, (ref_key, loc_key) in enumerate(zip(self.reference_keys, locale_keys)):
                if ref_key != loc_key:
                    first_diff = {
                        "position": i,
                        "reference": ref_key,
                        "locale": loc_key
                    }
                    break
        
        # Determine if file needs changes
        needs_changes = not keys_match or missing_keys or empty_values
        
        return {
            "file": locale_file.name,
            "key_count": len(locale_keys),
            "keys_match_order": keys_match,
            "missing_keys": missing_keys,
            "extra_keys": extra_keys,
            "empty_values": empty_values,
            "first_difference": first_diff,
            "needs_changes": needs_changes,
            "data": locale_data
        }
    
    def load_reference(self) -> bool:
        """Load the model file and extract keys."""
        if not self.reference_file.exists():
            self.log(f"❌ model file not found: {self.reference_file}")
            return False
        
        self.log(f"Loading model file: {self.reference_file}")
        self.reference_data = self.load_json_file(self.reference_file)
        if not self.reference_data:
            self.log("❌ Failed to load model file")
            return False
        
        self.reference_keys = self.get_ordered_keys(self.reference_data)
        self.log(f"Reference loaded with {len(self.reference_keys)} keys")
        
        # Detect changes since last session and prepare invalidation list
        self.detect_value_changes()
        
        return True
    
    def get_locale_files(self) -> List[Path]:
        """Get all locale files (excluding en.json and backup files)."""
        locale_files = []
        for file_path in self.messages_dir.glob('*.json'):
            if file_path.name != 'en.json' and not file_path.name.endswith('.bak'):
                locale_files.append(file_path)
        return sorted(locale_files)
    
    def compare_dicts_for_changes(self, old_dict: Dict[str, Any], new_dict: Dict[str, Any]) -> Dict[str, Any]:
        """Compare two dictionaries and return nested dict of changed values (like sync_msg_model.py)."""
        changed_values = {}
        for key, value in new_dict.items():
            if key in old_dict:
                if isinstance(value, dict) and isinstance(old_dict[key], dict):
                    nested_changes = self.compare_dicts_for_changes(old_dict[key], value)
                    if nested_changes:
                        changed_values[key] = nested_changes
                elif old_dict[key] != value:
                    changed_values[key] = value
            else:
                changed_values[key] = value
        return changed_values
    
    def update_translations_with_changes(self, lang_data: Dict[str, Any], changes: Dict[str, Any]) -> int:
        """Update translations with changed English values (like sync_msg_model.py). Returns count of changes."""
        change_count = 0
        for key, value in changes.items():
            if isinstance(value, dict):
                if key in lang_data and isinstance(lang_data[key], dict):
                    change_count += self.update_translations_with_changes(lang_data[key], value)
                else:
                    lang_data[key] = value
                    change_count += 1
            else:
                lang_data[key] = value
                change_count += 1
        return change_count
    
    def detect_value_changes(self):
        """Detect changes in English values since last commit using backup file."""
        if not self.backup_file.exists():
            self.log("⚠️ No backup file found - first run or clean state")
            self.changed_english_values = {}
            return
        
        self.backup_data = self.load_json_file(self.backup_file)
        if not self.backup_data:
            self.log("⚠️ Failed to load backup file")
            self.changed_english_values = {}
            return
        
        # Find changed English values (nested dict structure)
        self.changed_english_values = self.compare_dicts_for_changes(self.backup_data, self.reference_data)
        
        if self.changed_english_values:
            # Count total changes for display
            change_count = self._count_changes_recursive(self.changed_english_values)
            self.log(f"Detected {change_count} changed English values since last commit")
            # Show a few examples
            examples = self._get_change_examples(self.backup_data, self.reference_data, self.changed_english_values)
            for example in examples[:3]:
                self.log(f"   - {example}")
            if change_count > 3:
                self.log(f"   ... and {change_count - 3} more")
        else:
            self.log("No English value changes detected since last commit")
    
    def _count_changes_recursive(self, changes: Dict[str, Any]) -> int:
        """Count total number of changes in nested dict."""
        count = 0
        for key, value in changes.items():
            if isinstance(value, dict):
                count += self._count_changes_recursive(value)
            else:
                count += 1
        return count
    
    def _get_change_examples(self, root_old_dict: Dict[str, Any], root_new_dict: Dict[str, Any], changes: Dict[str, Any], prefix: str = "") -> List[str]:
        """Get example change descriptions for display."""
        examples = []
        for key, value in changes.items():
            full_key = f"{prefix}.{key}" if prefix else key
            if isinstance(value, dict):
                # Always pass the root dictionaries, not nested ones
                examples.extend(self._get_change_examples(root_old_dict, root_new_dict, value, full_key))
            else:
                # Use get_nested_value to get the old value using the full key path from the root
                old_value = self.get_nested_value(root_old_dict, full_key) if root_old_dict else None
                old_value_str = old_value if old_value is not None else "(missing)"
                examples.append(f"{full_key}: '{old_value_str}' → '{value}'")
        return examples
    
    def update_backup_file(self):
        """Update the backup file with current reference data."""
        try:
            with open(self.backup_file, 'w', encoding='utf-8') as f:
                json.dump(self.reference_data, f, ensure_ascii=False, indent=2, separators=(',', ': '))
                f.write('\n')
            self.log(f"💾 Updated backup file: {self.backup_file.name}")
        except Exception as e:
            self.log(f"❌ Error updating backup file: {e}")
    

    
    def standardize_all(self) -> bool:
        """Standardize all localization files."""
        if not self.load_reference():
            return False
        
        locale_files = self.get_locale_files()
        if not locale_files:
            self.log("❌ No locale files found to standardize")
            return False
        

        
        success_count = 0
        files_with_changes = []
        files_already_matching = []
        changes_made_overall = False
        
        for locale_file in locale_files:
            analysis = self.analyze_file(locale_file)
            if "error" in analysis:
                continue
            
            self.changes_made = []  # Reset changes for this file
            
            # Start with the current data (or standardized data if changes needed)
            if analysis['needs_changes']:
                # File needs structural changes
                files_with_changes.append(locale_file.name)
                changes_made_overall = True
                
                # Report missing keys that will be added
                if analysis['missing_keys']:
                    for missing_key in analysis['missing_keys']:
                        reference_value = self.get_nested_value(self.reference_data, missing_key)
                        self.changes_made.append(f"Added missing key `{missing_key}`: `\"\"` → `\"{reference_value}\"`")
                
                # Reorder the locale data to match reference structure
                standardized_data = self.reorder_dict_by_reference(analysis['data'], self.reference_data)
                
                # Handle empty values that need English placeholders
                for key_path in analysis.get('empty_values', []):
                    reference_value = self.get_nested_value(self.reference_data, key_path)
                    old_value = self.get_nested_value(analysis['data'], key_path) or ""
                    self.set_nested_value(standardized_data, key_path, reference_value)
                    # Don't report empty value fills separately - they're handled by the reordering process
                
                # Report removed extra keys (they are automatically removed by reorder_dict_by_reference)
                if analysis['extra_keys']:
                    extra_key_list = ', '.join([f"`{k}`" for k in analysis['extra_keys'][:5]])
                    if len(analysis['extra_keys']) > 5:
                        extra_key_list += f" and {len(analysis['extra_keys']) - 5} more"
                    self.changes_made.append(f"Removed {len(analysis['extra_keys'])} extra keys: {extra_key_list}")
            else:
                # File doesn't need structural changes, but we still need to check for invalidations
                files_already_matching.append(locale_file.name)
                standardized_data = analysis['data']  # Use current data as-is
            
            # Apply invalidations for ALL files (regardless of structural changes)
            invalidated_count = 0
            if self.changed_english_values:
                invalidated_count = self.update_translations_with_changes(standardized_data, self.changed_english_values)
                if invalidated_count > 0:
                    # Mark that this file has changes due to invalidation (but don't add to report - only English changes section will show)
                    if not analysis['needs_changes']:  # File didn't need structural changes but needs invalidation
                        changes_made_overall = True
                        if locale_file.name in files_already_matching:
                            files_already_matching.remove(locale_file.name)
                        files_with_changes.append(locale_file.name)
            
            # Determine if any changes were made (structural or invalidations)
            structural_changes = [change for change in self.changes_made if not change.startswith("Invalidated")]
            file_has_changes = bool(structural_changes) or analysis['needs_changes'] or (invalidated_count > 0)
            
            # Save the file if any changes were made
            if file_has_changes:
                self.save_json_file(locale_file, standardized_data)
                changes_made_overall = True
                self.log(f"Updated {locale_file.name}")
                
                # Add to report if there are structural changes (added/removed keys)
                if structural_changes:
                    self.report_lines.append(f"\n### {locale_file.name}")
                    for change in structural_changes:
                        self.report_lines.append(f"- {change}")
            else:
                self.log(f"No changes needed for {locale_file.name}")
            
            self.changes_made = []  # Reset for next file
            
            success_count += 1
        
        self.log(f"Processed {success_count}/{len(locale_files)} files successfully")
        
        # English value changes should always be considered "changes" for reporting
        if self.changed_english_values:
            changes_made_overall = True
        
        # Update backup file if any changes were made or if invalidations occurred
        if changes_made_overall or self.changed_english_values:
            self.update_backup_file()
        
        # Add English value changes section at the top if any occurred
        if self.changed_english_values and changes_made_overall:
            # Insert at the beginning of the report
            english_changes = ["\n### English Value Changes"]
            examples = self._get_change_examples(self.backup_data or {}, self.reference_data, self.changed_english_values)
            for example in examples:
                key, change = example.split(': ', 1)
                old_val, new_val = change.split(' → ', 1)
                english_changes.append(f"- `{key}`: {old_val} → {new_val}")
            english_changes.append("")  # Add blank line after section
            
            # Insert at the beginning of report_lines
            self.report_lines = english_changes + self.report_lines
        
        # Only write report if changes were made
        if changes_made_overall:
            self.write_report()
        else:
            print("No changes needed - all files already match reference structure")
        
        return True
    
    def write_report(self):
        """Write changes report to file."""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        # Check if file exists to determine if we need a separator
        file_exists = self.report_file.exists()
        
        with open(self.report_file, 'a', encoding='utf-8') as f:
            if file_exists:
                f.write("\n---\n\n")  # Separator between runs
            
            f.write(f"## Changes - {timestamp}\n\n")
            
            # Only write file sections and their changes
            content_written = False
            current_file = None
            
            for line in self.report_lines:
                clean_line = line.strip()
                
                # Check if this is a file header
                if clean_line.startswith('### '):
                    current_file = clean_line
                    f.write(clean_line + '\n')
                    content_written = True
                # Check if this is a change item
                elif clean_line.startswith('- ') and current_file:
                    f.write(clean_line + '\n')
                    content_written = True
                # Add blank line after each file section
                elif clean_line == '' and current_file:
                    f.write('\n')
                    current_file = None
            
            if not content_written:
                f.write("No changes made.\n")
        
        print(f"\nChanges recorded in: {self.report_file}")


def main():
    print("\nStarting localization sync...")
    # Determine messages directory path
    script_dir = Path(__file__).parent.parent
    messages_dir = script_dir / 'messages'
    
    if not messages_dir.exists():
        print(f"❌ Messages directory not found: {messages_dir}")
        return
    
    # Initialize manager and standardize files
    manager = LocalizationManager(messages_dir)
    manager.standardize_all()

    print("✅ Localization sync completed.\n")


if __name__ == '__main__':
    main()
