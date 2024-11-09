import os
import json


def deep_update(current, model_update):
    """
    Recursively update the current dictionary with keys and values from the model_update dictionary.
    Remove keys from the current dictionary that do not exist in the model_update dictionary.
    """
    keys_to_remove = [key for key in current if key not in model_update]
    for key in keys_to_remove:
        del current[key]

    for key, value in model_update.items():
        if isinstance(value, dict):
            if not isinstance(current.get(key), dict):
                current[key] = {}
            current[key] = deep_update(current.get(key, {}), value)
        else:
            if key not in current:
                current[key] = value
    return current


def compare_dicts(old_dict, new_dict):
    changed_keys = {}
    for key, value in new_dict.items():
        if key in old_dict:
            if isinstance(value, dict) and isinstance(old_dict[key], dict):
                nested_changes = compare_dicts(old_dict[key], value)
                if nested_changes:
                    changed_keys[key] = nested_changes
            elif old_dict[key] != value:
                changed_keys[key] = value
        else:
            changed_keys[key] = value
    return changed_keys


def update_translations(lang_data, changes):
    for key, value in changes.items():
        if isinstance(value, dict):
            if key in lang_data and isinstance(lang_data[key], dict):
                update_translations(lang_data[key], value)
            else:
                lang_data[key] = value
        else:
            lang_data[key] = value


def update_language_files():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    messages_dir = os.path.normpath(os.path.join(script_dir, "../messages"))
    model_filename = "en.json"

    msg_model_file_path = os.path.join(messages_dir, model_filename)
    msg_model_backup_path = msg_model_file_path + ".bak"

    with open(msg_model_file_path, "r", encoding="utf-8") as model_file:
        model_data = json.load(model_file)

    # Load the previous state of the EN file for value comparison
    if os.path.exists(msg_model_backup_path):
        with open(msg_model_backup_path, "r", encoding="utf-8") as backup_file:
            backup_data = json.load(backup_file)
    else:
        backup_data = {}

    value_changes = compare_dicts(backup_data, model_data)

    for filename in os.listdir(messages_dir):
        if filename.endswith(".json") and filename != model_filename:
            file_path = os.path.join(messages_dir, filename)

            with open(file_path, "r", encoding="utf-8") as lang_file:
                lang_data = json.load(lang_file)

            lang_data = deep_update(lang_data, model_data)
            update_translations(lang_data, value_changes)

            with open(file_path, "w", encoding="utf-8") as lang_file:
                json.dump(lang_data, lang_file, ensure_ascii=False, indent=2)
            print(f"Updated {filename}")

    with open(msg_model_backup_path, "w", encoding="utf-8") as backup_file:
        json.dump(model_data, backup_file, ensure_ascii=False, indent=2)


if __name__ == "__main__":
    update_language_files()
