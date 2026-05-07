from enum import StrEnum


class CustomPydanticErrorTypes(StrEnum):
    entry_validation = "superplaced-cv_entry_validation_error"
    other = "superplaced-cv_other_error"
