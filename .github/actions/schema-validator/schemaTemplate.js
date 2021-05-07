const nowSecureSchema = {
    "type": "object",
    "patternProperties": {
        "^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}$": {
            "type": "object",
            "properties": {
                "key": {
                    "type": "string"
                },
                "title": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "recommendation": {
                    "type": "string"
                },
                "severity": {
                    "type": "string"
                },
                "assessmentVersion": {
                    "type": "string"
                },
                "platform": {
                    "type": "string"
                }
            },
            "required": ["key", "title", "description", "severity", "assessmentVersion", "platform"]
        }
    },
    "required": true,
    "additionalProperties": false,
    "id": "basic"
};

const nowSecureExtraFieldsSchema = {
    "type": "object",
    "patternProperties": {
        "^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}$": {
            "type": "object",
            "properties": {
                "key": {
                    "type": "string"
                },
                "kind": {
                    "type": "string"
                },
                "title": {
                    "type": "string"
                },
                "category": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "recommendation": {
                    "type": "string"
                },
                "severity": {
                    "type": "string"
                },
                "assessmentVersion": {
                    "type": "string"
                },
                "platform": {
                    "type": "string"
                }
            },
            "required": ["key", "kind", "title", "category", "description", "severity", "assessmentVersion", "platform"]
        }
    },
    "required": true,
    "additionalProperties": false,
    "id": "extra"
};

module.exports = {nowSecureSchema, nowSecureExtraFieldsSchema};
