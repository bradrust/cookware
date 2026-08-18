# GitHub Collaboration — Onboarding Editors (Amy, VAs)

GitHub's collaborator model is repo-wide by default: adding someone as a "Write" collaborator lets them push to any file. To limit an editor to just recipe content without paying for GitHub Enterprise, layer three lightweight controls: **branch protection**, **CODEOWNERS**, and a **path-check GitHub Action**.

Realistic threat model: you're not defending against a malicious editor — Amy isn't going to sabotage the repo. You're defending against **accidents**: Amy accidentally editing `config.ts` and breaking the build, or an editor's account being compromised and used to push a payload. The setup below catches those.

## The Layered Setup

### Layer 1 — Add the Collaborator

1. On GitHub → your repo → **Settings → Collaborators → Add people**.
2. Add Amy's GitHub username with **Write** role.
3. She accepts the invitation via the email GitHub sends her.

At this point she can push to any branch. The next two layers restrict what actually lands on `main`.

### Layer 2 — Protect the `main` Branch

**Settings → Branches → Branch protection rules → Add rule:**

- **Branch name pattern:** `main`
- ✅ **Require a pull request before merging**
  - ✅ Require approvals: `1`
  - ✅ Require review from Code Owners
  - ✅ Dismiss stale reviews when new commits are pushed
- ✅ **Require status checks to pass before merging**
  - Add `build` (from the deploy workflow) once you push it once so the check name is registered
  - Add `scope-check` (see Layer 3 below)
  - ✅ Require branches to be up to date before merging
- ✅ **Require conversation resolution before merging**
- ✅ **Do not allow bypassing the above settings** (turn off for yourself only if you need emergency pushes)

Now nobody — Amy or you — can push directly to `main`. Everything goes through a PR.

### Layer 3 — CODEOWNERS + Auto-Approve for Recipe-Only Changes

[`.github/CODEOWNERS`](.github/CODEOWNERS) declares that changes to `src/lib/config.ts`, `.github/`, `astro.config.mjs`, and `package.json` require **your** review, while changes under `src/content/recipes/` only need a listed content owner (which includes Amy).

Combined with the branch-protection "Require review from Code Owners" rule, this means:

- Amy opens a PR touching only `src/content/recipes/creamy-tuscan-chicken.md` → Amy or you can approve → merges cleanly.
- Amy opens a PR touching `src/lib/config.ts` → CODEOWNERS routes it to you → you must approve.
- Amy opens a PR mixing both → CODEOWNERS routes it to you → you must approve.

### Layer 4 — Path Scope Check (Automated Guard-Rail)

For accidental changes to be blocked *automatically* (not just require your review), add a workflow that fails when a non-owner touches paths outside `src/content/recipes/`. Optional but recommended.

Create `.github/workflows/scope-check.yml`:

```yaml
name: Scope check

on:
  pull_request:
    branches: [main]

permissions:
  contents: read
  pull-requests: read

jobs:
  scope-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Check paths
        run: |
          # Adjust the whitelist and username as needed.
          AUTHOR="${{ github.event.pull_request.user.login }}"
          if [ "$AUTHOR" = "your-github-handle" ]; then
            echo "Owner PR — no scope restriction."
            exit 0
          fi
          BASE="${{ github.event.pull_request.base.sha }}"
          HEAD="${{ github.event.pull_request.head.sha }}"
          CHANGED=$(git diff --name-only "$BASE" "$HEAD")
          echo "Changed files:"
          echo "$CHANGED"
          BAD=$(echo "$CHANGED" | grep -v '^src/content/recipes/' || true)
          if [ -n "$BAD" ]; then
            echo "::error::Non-owner PR touches non-recipe paths:"
            echo "$BAD"
            exit 1
          fi
          echo "All changes are within src/content/recipes/ — OK."
```

Then in branch protection, add `scope-check` as a required status check. Now a PR from Amy that accidentally includes `package.json` fails CI and cannot merge until she trims the PR.

## The Editing Workflow For Amy

Once the setup above is in place, Amy's day-to-day is:

1. **Open the repo on github.com.**
2. Navigate to `src/content/recipes/`.
3. Click **Add file → Create new file** (for a new recipe) OR click a recipe file → pencil icon (to edit).
4. Write / edit markdown in the browser editor. Preview available on the "Preview changes" tab.
5. Click **Commit changes**:
   - Choose **"Create a new branch"** and give it a name like `recipe/tuscan-chicken`.
   - Click **"Propose changes"** → **"Create pull request"**.
6. Add a short PR title + description.
7. Owner reviews and merges.
8. Site auto-deploys within ~2 minutes via the GitHub Actions workflow.

No git CLI, no local dev environment, no risk of accidentally committing something else. This is the workflow Amy will actually use.

## If You Want a Full CMS Layer Later

Once Amy is happy with the GitHub-web-editor flow, you may still want a nicer WYSIWYG. Two options:

- **Decap CMS** (formerly Netlify CMS) — free, git-backed, self-hosted at `/admin` on your site. Uses GitHub OAuth for login. See [decapcms.org](https://decapcms.org).
- **TinaCMS** — similar, with a slicker UI, some paid features.

Both write to the same markdown files under `src/content/recipes/` — the site doesn't need to change. Add whichever when the pain of "click here, click Edit, remember frontmatter" exceeds ~5 minutes of Amy's time per week.

## What NOT to Do

- **Don't skip branch protection.** Without it, a compromised collaborator account can push directly to `main`, which auto-deploys. That's a real risk even for personal projects — GitHub account takeovers do happen.
- **Don't give collaborators "Maintain" or "Admin" role.** "Write" is enough for the workflow above. Anything higher lets them modify branch protection rules and defeat the whole scheme.
- **Don't add Amy's personal Google/Gmail account as a GitHub collaborator directly.** Have her create a real GitHub identity. Auditability matters if something ever goes wrong.
- **Don't put secrets in `config.ts`** even though the file is committable. See [README.md](README.md#secrets) for `.env` conventions.
