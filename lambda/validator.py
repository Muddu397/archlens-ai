import json


def parse_response(text: str):
    """
    Parse Bedrock response into JSON.
    Removes markdown code fences if present.
    """

    text = text.strip()

    if text.startswith("```json"):
        text = text.replace("```json", "", 1)

    if text.startswith("```"):
        text = text.replace("```", "", 1)

    if text.endswith("```"):
        text = text[:-3]

    text = text.strip()

    try:
        return json.loads(text)

    except json.JSONDecodeError as e:
        raise ValueError(
            f"Invalid JSON returned by Bedrock:\n\n{text}\n\nError: {e}"
        )