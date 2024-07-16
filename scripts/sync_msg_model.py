import os
import json


def deep_update(source, updates):
    """
    Recursively update the source dictionary with keys and values from the updates dictionary.
    Remove keys from the source dictionary that do not exist in the updates dictionary.
    """
    keys_to_remove = [key for key in source if key not in updates]
    for key in keys_to_remove:
        del source[key]

    for key, value in updates.items():
        if isinstance(value, dict):
            source[key] = deep_update(source.get(key, {}), value)
        else:
            if key not in source:
                source[key] = value
    return source


def update_language_files():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    messages_dir = os.path.normpath(os.path.join(script_dir, "../messages"))
    model_filename = "en.json"

    msg_model_file_path = os.path.join(messages_dir, model_filename)
    with open(msg_model_file_path, "r", encoding="utf-8") as model_file:
        model_data = json.load(model_file)

    for filename in os.listdir(messages_dir):
        if filename.endswith(".json") and filename != model_filename:
            file_path = os.path.join(messages_dir, filename)

            with open(file_path, "r", encoding="utf-8") as lang_file:
                lang_data = json.load(lang_file)

            original_lang_data = lang_data.copy()
            lang_data = deep_update(lang_data, model_data)

            # print(f"lang_data for {filename}\n: {lang_data}")

            # if lang_data != original_lang_data:
            with open(file_path, "w", encoding="utf-8") as lang_file:
                json.dump(lang_data, lang_file, ensure_ascii=False, indent=4)
            print(f"Updated {filename}")


if __name__ == "__main__":
    update_language_files()
