# Use the AI Agent Skill

Superplaced AI CV provides an AI agent skill that teaches AI coding assistants how to create, edit, and render CVs. Once installed, your agent gains full knowledge of Superplaced AI CV's YAML schema, CLI commands, themes, locales, and design options.

## Supported Agents

The skill works with any AI agent that supports the [skills standard](https://skills.sh), including Claude Code, Claude Desktop, Cursor, Codex, Copilot, Windsurf, and Gemini CLI.

## Install the Skill

=== "Vercel Skills CLI"

    ```bash
    npx skills add superplaced-cv/superplaced-cv-skill
    ```

    You can also target a specific agent:

    ```bash
    npx skills add superplaced-cv/superplaced-cv-skill -a claude-code
    npx skills add superplaced-cv/superplaced-cv-skill -a cursor
    npx skills add superplaced-cv/superplaced-cv-skill -a codex
    ```

=== "OpenSkills"

    ```bash
    npx openskills install superplaced-cv/superplaced-cv-skill
    ```

=== "Claude Desktop"

    1. Download [`superplaced-cv_skill.zip`](../../assets/superplaced-cv_skill.zip).
    2. In Claude Desktop, click **Customize** (top left), then select **Skills**.
    3. Click **"+"** and select **"Upload a skill"**.
    4. Upload the downloaded ZIP file.

    The skill will appear in your Skills list and Claude will automatically use it when working with your CV. See [Claude's official guide](https://support.claude.com/en/articles/12512180-use-skills-in-claude) for detailed screenshots.

=== "Manual"

    Copy the content of [`skills/superplaced-cv/SKILL.md`](https://github.com/superplaced-cv/superplaced-cv-skill/blob/main/skills/superplaced-cv/SKILL.md) into your agent's skill directory. For example, for Claude Code:

    ```bash
    git clone https://github.com/superplaced-cv/superplaced-cv-skill.git
    cp -r superplaced-cv-skill/skills/superplaced-cv ~/.claude/skills/
    ```

## Auto-Generated and Evaluated

The skill is auto-generated from Superplaced AI CV's source code. A [build script](https://github.com/superplaced-cv/superplaced-cv/blob/main/scripts/superplaced-cv_skill/generate.py) parses the Pydantic models via AST, strips them down to schema-relevant fields, generates sample CVs and design configs, and renders everything into a single SKILL.md through a Jinja2 template. This keeps the skill always in sync with the latest Superplaced AI CV version.

We maintain a [promptfoo eval suite](https://github.com/superplaced-cv/superplaced-cv/tree/main/scripts/superplaced-cv_skill/evals) that validates the skill's quality. The evals cover CV generation (software engineers, academics, fresh graduates, non-English locales), design customization, CLI workflows, and parsing messy CV text into clean YAML. Each generated YAML is validated through Superplaced AI CV's own Pydantic pipeline, the same validation `superplaced-cv render` uses, so schema violations are caught deterministically, not just with LLM-as-judge.

## What the Skill Provides

The skill gives your AI agent:

- Full knowledge of Superplaced AI CV's YAML input structure
- All 6 built-in themes and their design options
- Complete locale and language support (20 built-in languages)
- CLI commands and their options
- Pydantic model schemas for precise field types and defaults
- A complete sample CV as a reference

## Usage

After installing the skill, simply ask your AI agent to work with your CV:

- "Create a new CV for me using the classic theme"
- "Switch my CV to the engineeringresumes theme"
- "Add a new experience entry to my CV"
- "Change the font to Source Sans 3 and make the margins smaller"
- "Translate my CV to German"

The agent will use its knowledge from the skill to produce correct YAML and run the right `superplaced-cv` commands.
