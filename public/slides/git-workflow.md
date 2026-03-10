# Git Workflow

### Practical Git for Teams

Note:
Hey team, first and foremost thank you all for coming. I hope this is the first of many KT sessions we'll have and that this will be beneficial for everyone, not only the app team. With our team growing and our discussions about branch strategies and release plans, we've felt that having this session to share a bit about other Git workflows would be great for us and help improve how we work together. So let's get started!

---

### Topics we'll cover:

* What Git is and why we use it
* Core concepts
* Fixing commits
* Conventional commits
* Working with Git in teams
* Merge vs Rebase
* Why a clean history matters

Note:
Quick roadmap: we'll start with what Git is and core concepts and commands, then move to fixing mistakes, conventional commits, team workflows, and finally merge vs rebase and why clean history matters.

---

# Part 1 — Git Basics

Note:
I know this might feel a bit too basic, but let's get everyone on the same page — not all of us come from a development or engineering background. I promise this will be quick.

----

## What is Git?

**Git** is a distributed version control system.

It allows developers to:

* Track code changes
* Collaborate safely
* Revert mistakes
* Maintain project history

Created in **2005 by Linus Torvalds** to manage the Linux kernel.

Note:
Emphasize: It's not just "version control"; it's the standard for collaboration in software. Why is Git the standard? Surely there's a reason everyone uses it.

----

## The Git Mental Model

Git stores **snapshots**, not file differences.

Each commit is a **snapshot of the project at a moment in time**.

```
Commit A → Commit B → Commit C
```

Each commit contains:

* project files
* metadata
* reference to the previous commit

Note:
Snapshots vs diffs: Git stores the full state at each commit. That's why branching and reverting are fast—it's pointer arithmetic, not patch application.

----

## Core Git Concepts

* **Repository**: Project tracked by Git

* **Commit**: Snapshot of the project

* **Branch**: A movable pointer to commits

* **HEAD**: Your current position in the repository

Note:
Now that we have a baseline understanding of how Git works, we need to define a few key concepts. Most of these will be familiar to you. We use them daily, but might never have deep-dived into what's going on under the hood.

----

## What a Branch Really Is (1/2)

A branch is **just a pointer to a commit**.

```
A --- B --- C  (main)
          ^
        HEAD
```

Creating a branch simply creates another pointer.

Note:
No copying of files—just a new pointer. That's why "create a branch" is instant even in huge repos.

----

## What a Branch Really Is (2/2)

```
A --- B --- C  (main)
          \
           D (feature)
```

Branches are **cheap and fast**.

Note:
Encourage the team to branch often for features and fixes. There's no cost.

----

## Live Demo 1 — Basic Git Workflow

Commands we'll run:

```bash
git init
git add .
git commit -m "Initial commit"
git branch feature/login
git checkout feature/login
# or: git switch feature/login
```

Note:
For the sake of time, we won't actually run those commands in the terminal right now. We'll use most of them during the remainder of the presentation. Either way, if you're not that familiar with Git, I strongly recommend running those commands and trying them out yourself.

---

# Part 2 — Fixing Your Work

Note:
Before sharing with the team, we often want to fix the last commit or tidy a few commits. This section is about fixing history locally.

----

## Problem: Commits Aren't Always Perfect

Common situations:

* Forgot to add a file
* Bad commit message
* Too many small commits

Git provides tools to **fix history before sharing it**.

Note:
Like commits, we aren't always perfect. Git provides the tools we need to amend our mistakes and make great code as a team. So how can we fix our commits?

----

## Amending a Commit

Modify the last commit.

```bash
git commit --amend
```

Typical uses:

* Fix commit message
* Add forgotten files

Note:
Only the most recent commit. After amend, that commit is replaced—new hash. Safe as long as you haven't pushed it.

----

## Amending a Commit — Example

Before:

```
Initial commit
Add login endpoint
```

After:

```
Initial commit
feat(auth): add login endpoint
```

Note:
Show the before/after: messy message vs conventional. Amend is the go-to for "oops, wrong message" or "forgot to add that file."

----

## Fixup Commits (1/3)

Fixup commits allow you to **fix something without rewriting history immediately**.

```bash
git commit --fixup <commit>
```

Git marks it automatically.

Note:
Fixup is for when the mistake isn't the last commit. You're saying "this change belongs with that earlier commit." We'll fold it in with rebase --autosquash.

----

## Fixup Commits (2/3)

A Naive Example:

```
feat(auth): add login endpoint
fixup! feat(auth): add login endpoint
```

Later we clean this using **rebase --autosquash**: fixups fold into the right commit.

Note:
One fixup, one target commit. After autosquash you get a single clean commit. Demo this if time allows.

----

## Fixup Commits (3/3)

Example with several commits:

```
feat(auth): add logout
feat(auth): add logout analytics events
refactor(auth): clean up OAuth implementation
fixup! feat(auth): add logout analytics events
```

Note:
Multiple fixups for different commits. Each fixup! line matches a prior commit by message prefix. Autosquash will apply them in the right order.

----

## Live Demo 2 — Fixing Commits

We'll show:

1. Create a bad commit
2. Add a fixup commit
3. Use **rebase --autosquash** to clean history

We'll dive into **interactive rebase** later in the presentation.

Note:
Demo: make a bad commit, add a fixup, then run git rebase -i --autosquash (or autosquash with your base). Show the result: one clean commit. Tease interactive rebase for later.

----

## Pushing After Rewriting: Force Safely

After **amend** or **rebase**, normal `git push` is rejected.

* **`--force`** — overwrites remote. Risky if others use the branch.
* **`--force-with-lease`** — overwrites only if remote hasn’t changed. Safe default.

Note:
Use --force-with-lease for your feature branches when updating a rebased/amended PR. If the push fails, someone else pushed—fetch, rebase, then try again. Never force-push to main/develop without team agreement. --force can wipe others' work on the same branch.

---

# Part 3 — Conventional Commits

Note:
Conventional Commits is a simple standard so messages are consistent and machine-readable. Great for changelogs and tooling.

----

## Why Conventional Commits?

Commit messages should be **consistent and informative**.

Conventional commits provide a **simple standard**.

Format:

```
type(scope): description
```

Example:

```
feat(auth): add login endpoint
```

Note:
type(scope): description. Scope is optional. Breaking changes can use ! or BREAKING CHANGE in the body. Keep descriptions imperative: "add" not "added."

----

## Common Types

| Type     | Meaning              |
| -------- | -------------------- |
| feat     | New feature          |
| fix      | Bug fix              |
| refactor | Internal improvement |
| test     | Tests                |
| docs     | Documentation        |
| chore    | Maintenance          |

Note:
feat and fix are the most important for semver and changelogs. docs, test, refactor, chore keep the history clear. Teams can add more types (e.g. style, perf).

----

## Why This Matters

Benefits:

* Clear project history
* Easier code reviews
* Better automation (changelogs, releases)

Your commit history should **tell a story**.

Note:
Automation: tools can generate changelogs from conventional commits. Code review is easier when each commit has a clear purpose. History becomes documentation.

---

# Part 4 — Working With Git in Teams

Note:
We'll look at a typical main/develop + feature branches setup and how to visualize and sync with the rest of the team.

----

## Typical Branch Structure

Example workflow:

```
main
  │
  └── develop
        ├── feature/login
        ├── feature/payments
        └── feature/profile
```

Each feature branch:

* starts from `develop`
* gets merged back when finished

Note:
Adjust this to your team's actual flow (e.g. trunk-based, main-only). The idea: shared base branch, short-lived feature branches.

----

## Visualizing the Commit Tree

Example development tree:

```
        D---E (feature-login)
       /
A---B---C (develop)
       \
        F---G (feature-payments)
```

Multiple developers can work in parallel.

Note:
Two feature branches from develop. No conflict until they're merged. This is the normal state of a healthy repo.

----

## Live Demo 3 — Viewing the Tree

Command:

```bash
git log --graph --all
```

This shows:

* branches
* merges
* commit structure

Note:
Run git log --graph --all in a repo with multiple branches. Point out merges, branch points, and how to read the graph. Optional: --oneline for density.

---

# Part 5 — Syncing Your Branch

Note:
Your branch was cut from develop last week; others have merged since. You need to bring those changes in. Two main ways: merge and rebase.

----

## Problem

While you're developing, other developers merge changes.

Your branch becomes **outdated**.

You need to **sync with the latest code**.

Two options:

* Merge
* Rebase

Note:
"Outdated" means your branch doesn't include the latest commits from the target branch. Syncing avoids big merge conflicts later and keeps CI relevant.

----

## Merge vs Rebase

Note:
Title slide for the comparison. Next we'll see merge, then rebase, then when hashes change and how to use interactive rebase.

----

## Merge

Command:

```bash
git merge develop
```

Result:

```
A---B---C---M  (feature)
     \     /
      D---E    (develop)
```

A **merge commit** joins histories.

**Pros:** Safe, no history rewriting  
**Cons:** Messy history over time

Note:
Merge creates a merge commit that joins two histories. Safe and reversible. Over time, many merge commits can make the graph noisy. Default in many teams.

----

## Rebase

Command:

```bash
git rebase develop
```

Git **replays your commits on top of develop**.

Before:

```
A---B---C (develop)
     \
      D---E (feature)
```

After:

```
A---B---C---D'---E' (feature)
```

Your commits are **recreated**.

Note:
Rebase replays your commits on top of develop. Result: linear history. Trade-off: you're rewriting your branch (new hashes). Never rebase shared/public commits.

----

## Why Rebase Changes Hashes

Commit hash depends on:

* content
* parent commit
* metadata

Since the **parent changes**, the **hash changes**.

```
D → D'
E → E'
```

Same code, **different commits**.

Note:
Hash depends on content, parent, and metadata. New parent means new hash. So D and E become D' and E'. Same diff, different commit IDs. Important for understanding PRs and bisect.

----

## Interactive Rebase (1/2)

Interactive rebase allows you to **rewrite history with more control**.

Command:

```bash
git rebase -i HEAD~N
```

Example menu:

```
pick a1b2 feat: add login
fixup c3d4 fix login bug
squash e5f6 update tests
```

Note:
git rebase -i HEAD~N opens an editor. pick, reword, edit, squash, fixup, drop. Fixup is what we used with fixup! commits; squash merges and lets you edit the message.

----

## Interactive Rebase (2/2)

You can:

* squash commits
* reorder commits
* edit messages
* remove commits

Note:
You can reorder (change the order of lines), squash several into one, reword messages, or drop a commit. All before pushing. Practice in a throwaway branch first.

----

## Fixups During Rebase

Fixups automatically combine commits.

Before:

```
feat: add login
fixup! feat: add login
```

After rebase:

```
feat: add login
```

Clean history.

Note:
Autosquash during interactive rebase moves fixup! commits and folds them in. You get one commit per logical change. This is the payoff of using fixup during development.

----

## Reading Rebase Diffs

Remember — rebase changes commit hashes.

This may cause:
* confusing diffs
* commits appearing as if they were new

**Tip:** Use your Git host's diff view between your branch and the target (e.g. "changes since base"), not the full history diff.

Note:
After rebase, the same change can show as "new" in the PR because the hash changed. Use your Git host's "changes since base" or compare against the target branch, not "all commits."

----

## Live Demo 4 — Rebase

We will demonstrate:

1. Branch divergence
2. Merge vs rebase
3. Interactive rebase with fixups
4. Clean commit history

Note:
Demo: branch from develop, make commits, someone else merges to develop. Show merge vs rebase. Then interactive rebase with fixups. End with a clean, linear history.

---

# Part 6 — Why Clean History Matters

Note:
Final part: why we care. Messy history hurts debugging, review, and tooling. Clean history pays off for everyone.

----

## The Cost of Messy History

Messy history causes:

* harder debugging
* confusing pull requests
* difficult code reviews

Example bad history:

```
fix
fix2
oops
try again
temp
```

Note:
"fix", "fix2", "oops" make it hard to know what each commit did. Reviews and blame become noisy. Avoid this with the habits we've covered.

----

## Git Bisect

Git can automatically find the commit that introduced a bug.

Command:

```bash
git bisect
```

Git performs a **binary search through commits**.

Example: 100 commits → ~7 steps to find the bug

This works best when commits are **clean and meaningful**.

Note:
git bisect start, then mark good/bad. Git binary-searches to find the introducing commit. With small, focused commits, the culprit is obvious. With huge squashed commits, the diff is useless.

----

## Bisect and Autosquash — Like Oil and Water

Bisect still finds the bad commit after autosquash, but that commit’s **diff is huge** — many changes in one.

Result - hard to see what actually caused the bug; debugging slows down.

**Small, clean commits** keep bisect precise and the history readable.

Note:
Bisect still finds the bad commit, but if that commit is a 50-file "fix everything" squashed commit, you don't know what actually caused the bug. Small commits = precise bisect and readable history.

----

## Good Git Culture

Good teams encourage:

* small meaningful commits
* fixups during development
* clean history before merging

Goal: **Make Git history useful for future developers.**

Note:
Summarize: small commits, fixups during development, clean up before merge (rebase/autosquash). History is for the team and the future. Invite questions.

---

# Q&A