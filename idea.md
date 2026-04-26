# Cadie Idea Reference

## One-line Definition

Cadie is the shared home for product experiments, where teams save prototypes, explorations, demos, and learnings so good work does not get lost and future work can build on it.

## Short Pitch

Cadie helps product teams preserve unfinished but valuable work across design and code. Instead of experiments disappearing across Slack, Figma, GitHub, Notion, local folders, and preview links, Cadie turns them into durable team memory that can be searched, understood, and reused later.

## Core Problem

Modern product teams create a huge amount of valuable unfinished work:

- UI explorations
- prototype links
- motion tests
- coded demos
- screenshots
- Loom videos
- test builds
- quick notes

That work is fragmented across:

- Figma pages
- Slack threads
- GitHub branches
- Notion docs
- local folders
- Vercel previews
- browser tabs

Because of that:

- good ideas disappear
- teams repeat work
- context gets lost
- new teammates cannot see prior thinking
- rejected concepts never become reusable
- product history becomes invisible

Cadie exists to solve that.

## Product Category

Cadie is not:

- a bookmark manager
- a portfolio tool
- a file storage tool
- a team chat app
- a generic knowledge base

Cadie is:

- an experiment memory system
- a shared archive of product exploration
- a workspace for preserving product thinking before and around shipping

## Product Truth

Teams make far more valuable work than what ends up shipping, but they have almost no good system for preserving that exploration.

Cadie exists to fix that.

## Target Users

### Primary users

- product designers
- design engineers
- frontend engineers
- design leads
- PMs who need history and context
- product teams working across design and code

### Best early ICPs

- startup product teams
- design-forward startups
- design engineering teams
- small to mid-size product orgs with strong experimentation culture

### Best-fit team traits

- iterate quickly
- explore many directions
- work across design and code
- rely on prototypes and demos
- often lose context across tools

## Main User Jobs

Cadie is hired to help teams:

- capture experiments before they disappear
- preserve the meaning behind the work, not just the files
- retrieve old explorations when similar problems come back
- reuse concepts, patterns, and learnings
- share durable team artifacts
- learn what happened and what the team learned from each attempt

## Emotional Value

Cadie is not just about storage. It gives teams the feeling that:

- good work is not wasted
- exploration has lasting value
- ideas do not vanish after review
- unfinished work still matters
- the team is building memory, not just output

## Product Philosophy

- Save before it gets lost.
- Context is as important as the artifact.
- Experiments should stay useful later.
- Team memory compounds over time.
- The product should reduce repetition.
- Sharing should feel safe.

## Strategic Wedge

The wedge is not "share work in progress."

The wedge is:

Save experiments so they do not disappear, and make them reusable later.

Cadie should be:

- archive-first
- artifact-first
- context-rich
- async
- searchable
- scoped

Cadie should be less:

- feed-first
- performative
- company-broadcast by default

## Product Positioning

### Main positioning line

The home for product experiments.

### Supporting positioning

A shared workspace where product teams save prototypes, explorations, demos, and test builds with the context and learnings behind them.

### Sharper line

Where experiments do not disappear.

### Useful conversation shortcut

GitHub for product experiments.

This is useful conversationally, but should not necessarily be the homepage headline.

## Core Object Model

### Experiment

The main object in the system.

Each experiment can include:

- title
- summary
- what it was testing
- owner
- project / team / area
- status
- screenshots
- video
- Figma link
- prototype link
- code demo
- notes
- learnings
- outcome
- related experiments

### Artifacts

Attachments inside an experiment:

- image
- video
- PDF
- link
- prototype
- code preview
- note

### Collections

Flexible containers that group experiments by context, such as:

- checkout
- growth
- AI features
- mobile app
- design system
- Q2 exploration

Collections can represent:

- product areas
- teams
- features
- initiatives
- time-bound efforts

The experiment stays the star. Collections provide surrounding structure.

## Product Loop

Cadie should feel like:

Capture -> Clarify -> Reuse

### Capture

Save the experiment quickly.

### Clarify

Add enough context to make it understandable.

### Reuse

Find it later, reference it again, or connect it to future work.

## Adoption Challenge

The biggest risk is that Cadie feels like one more step.

People will resist it if they think:

- this is extra documentation work
- I can just drop this in Slack
- this is not worth formatting
- I do not know if this experiment matters yet

## Adoption Strategy

### Fast capture

The first step must feel almost effortless:

- paste Figma link
- drag screenshots
- drop video
- paste demo URL
- add short title
- done

### Auto-structure

Cadie should auto-fill where possible:

- title
- preview
- source
- artifact type
- owner
- date

### Lightweight enrichment

Deeper fields can come later:

- what was this testing?
- outcome
- learning
- next step

### Team workflow integration

Cadie should fit existing behavior:

- save in Cadie
- share Cadie link in Slack
- use Cadie in design reviews
- reference Cadie in retros
- search Cadie before starting similar work

## Information Architecture

### Primary navigation

- Experiments
- Collections
- Search
- Activity

Optional later:

- Templates
- Insights
- Archive

### Core pages

- Experiments: library of all experiments
- Experiment detail: the most important page
- Collections: grouped contexts
- Search: global retrieval
- Activity: recent additions, updates, comments, outcomes

## Home Page Structure

The home page should be a useful team surface, not just a generic dashboard.

Recommended sections:

- recent experiments
- active collections
- experiments needing context
- recently updated
- resurfaced related prior work
- experiments that led to shipping
- experiments with no outcome yet

## Experiment Detail Page

The experiment page should answer:

- what is this?
- why was it made?
- who made it?
- what was it testing?
- what happened?
- what did we learn?
- what should the team know?

Suggested sections:

- Header: title, owner, date, collection, status
- Overview: short summary, what this was testing
- Artifacts: screenshots, videos, Figma, prototypes, code demos, docs
- Context: problem, hypothesis, exploration notes
- Outcome: shipped, rejected, parked, evolved, what happened next
- Learnings: what the team learned, what others should know
- Connections: related experiments, follow-ups, previous versions, led to

## Search and Retrieval Model

Search is central to the product.

Users should be able to search by:

- title
- owner
- tags
- collection
- type
- text in notes
- outcome
- linked source
- OCR text later
- transcript text later
- PDF text later

The core retrieval moment is:

"Did we already try something like this?"

Cadie must answer that well.

## Sharing and Visibility Model

Visibility should be intentional and safe.

Recommended levels:

- Private draft: only creator or small group
- Team visible: visible in the workspace
- Shared link: easy to send in Slack or review threads

This lowers performance pressure and helps people save earlier-stage work.

## MVP Scope

### Must-have features

- create experiment
- attach artifacts
- title
- summary
- owner
- collection
- status
- search
- share link
- comment / note
- related experiments

### Strongly recommended MVP behaviors

- fast link pasting
- drag-and-drop media upload
- automatic previews
- auto-filled metadata where possible
- lightweight editing after capture

### Later features

- AI suggestions
- auto-grouping
- smart resurfacing
- outcome analytics
- templates
- deeper integrations beyond basic links
- OCR
- video transcripts
- semantic similarity and related experiment suggestions

## Best Initial Use Case

The best starting use case:

A designer or design engineer saves a prototype or exploration into Cadie before sharing it in Slack, so the experiment becomes a durable artifact instead of a disappearing message.

## Best Team Workflow

1. Designer or engineer creates an experiment.
2. They save artifacts in Cadie.
3. They add minimal context.
4. They share the Cadie link in Slack for discussion.
5. The team reviews it.
6. Later someone updates the outcome.
7. Future teammates find and reuse it.

## Homepage Messaging Draft

### Headline

The home for product experiments.

### Subheadline

Save prototypes, explorations, demos, and test builds with the context and learnings behind them, so good work does not disappear.

### Supporting copy

Cadie helps product teams preserve unfinished but valuable work across design and code. Capture experiments fast, keep the story behind them, and make them searchable and reusable later.

### How it works

- Save an experiment in seconds
- Add context like what it tested and what was learned
- Share the link with your team
- Find it again when a similar problem comes back

### Why it matters

Slack is where you talk about it. Cadie is where it survives.

### CTA ideas

- Start saving experiments
- Create your first experiment
- Build your team’s experiment memory

## Competitive Positioning

Cadie should not compete as:

- a calmer Slack
- another chat app
- an all-purpose docs tool
- generic async collaboration

Cadie should compete as:

- the home for product experiments
- the system of record for product exploration
- the memory layer for design and product work
- the place where unfinished work becomes reusable

## Cadie vs Campsite

### Simple distinction

- Campsite captures conversations.
- Cadie captures experiments.

### Another useful framing

- Campsite helps teams discuss work.
- Cadie helps teams preserve and reuse product exploration.

### Core differences

| Area | Campsite | Cadie |
|---|---|---|
| Category | Async team communication | Product experiment memory |
| Core object | Post / conversation | Experiment |
| Primary job | Discuss work clearly | Preserve and reuse exploration |
| Main value | Better team communication | Durable product memory |
| Default behavior | Write a post and discuss | Save an experiment and add context |
| Main surface | Channels, feed, inbox, follow-ups | Experiments, collections, search, outcomes |
| Best moment | "Let’s discuss this" | "Did we already try this?" |
| Main risk if copied | Another chat app | Another generic archive |

### What Cadie can do better than Campsite

- build a sharper object model around experiments
- unify design and code artifacts in one record
- support structured outcomes and learnings
- provide stronger retrieval across experiments
- surface related prior work before teams repeat themselves
- make unfinished work safer to save with scoped visibility
- track lifecycle from test to shipped, rejected, parked, or evolved

### What to learn from Campsite

- clarity of wedge
- strong product philosophy
- simple communication behavior
- calm async collaboration principles

### What not to copy from Campsite

- becoming communication-first
- over-indexing on feed and conversation
- trying to replace Slack directly
- broadening into general-purpose collaboration too early

## Cadie vs Other Competitors

### Compared to Slack

Slack is better for:

- quick sharing
- immediate discussion
- casual updates

Cadie should be better for:

- permanence
- structure
- retrieval
- context
- history
- reuse

Positioning line:

Slack is where you talk about it. Cadie is where it survives.

### Compared to Notion

Notion is a general-purpose workspace for docs and knowledge.

Cadie should be different because it is built around:

- experiments as the main object
- artifact capture
- outcomes and learnings
- related experiment history
- retrieval of exploration, not generic documentation

### Compared to Figma

Figma is where design work gets created.

Cadie should preserve:

- work across many Figma files
- context outside the canvas
- outcomes after review
- connections between designs, demos, and later experiments

Cadie is not another design tool. It is the memory layer around design exploration.

### Compared to GitHub

GitHub captures code changes and branches.

Cadie should capture:

- design experiments
- product reasoning
- prototypes outside production code
- screenshots, videos, demos, and mixed-media exploration

### Compared to Behance or portfolio tools

Portfolio tools showcase polished final work.

Cadie should preserve:

- process
- unfinished thinking
- rejected ideas
- messy but useful exploration

### Compared to generic bookmark or save tools

Bookmark tools save links.

Cadie should save:

- links plus meaning
- links plus outcomes
- links plus learnings
- links plus related experiments

## Why Cadie Wins If It Stays Focused

Cadie becomes strong if it stays narrow and excellent at one thing:

Being the home for product experiments.

That means prioritizing:

- low-friction capture
- high-quality context
- strong retrieval
- safe sharing
- reuse over time

It means avoiding:

- chat replacement
- project management sprawl
- generic docs sprawl
- becoming a save-anything bucket

## Risks

- capture feels like extra work
- product becomes too broad
- sharing feels too public and performative
- search and retrieval are weak
- product tries to replace too many other tools

## Product Principles for Future Decisions

When making roadmap or UX decisions, prefer choices that improve:

- capture speed
- context quality
- retrieval power
- reuse value
- safe visibility
- cross-tool preservation

Reject or de-prioritize choices that mainly push Cadie toward:

- chat
- feeds as the primary experience
- generic collaboration
- heavy documentation rituals

## Final Definition

Cadie is a team-focused experiment memory system for product work.

It is built for designers, engineers, and product teams who need a better way to capture experiments fast, preserve context, make work reusable, and learn from their own exploration history.

It is not a generic archive, not a social feed, and not another all-purpose workspace.

It is a clear, focused home for product experiments.
