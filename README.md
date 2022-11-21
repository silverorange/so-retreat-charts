# silverorange Retreat Charts

This contains a bunch of custom charts rendered with D3 that can be exported
and added to slides.

The charts are rendered using D3 and there is a lot of control over the visual
style of charts.

Charts are rendered as SVG on a HTML canvas so you can right-click and save the
charts as PNG. This makes it easier to import charts into slide software.
Charts are rendered at 3x normal size so the exported PNG assets look good on
high-dpi screens.

## Running

```sh
yarn install
yarn start
```

## Editing Data

Chart data comes from `src/data.ts`. Each exported dataset causes a separate
chart to be rendered.

### Site Release Data

Site release history is taken from Slack channels and cleaned up. The Slack
history is manually copied from relevant Slack Channels and then cleaned up
using grep to remove non-release messages and fix missing user-associations.

In future, a cleaner approach may be using a Slack data export for a specific
year. There does not seem to be an option to export a single channel.

### Pull Request Data

This data comes from a series of GitHub GraphQL queries. Because the data comes
from GitHub, if repositories are transferred outside our organization
visibility they will disappear from the stats.

For organizations where there are multiple contributors outside of silverorange
(i.e. HippoEducation) individual user queries are used to only track
contributions from silverorange staff.

Since we are only interested in merged PR counts in a date range, we do not
need to paginate data.

This data is currently collected semi-manually by updating the search date
ranges for each year for each orginization and/or user. This could be scripted
in the future.

### Repository Data

This data comes from a series of GitHub GraphQL queries. Because the data comes
from GitHub, if repositories are transferred outside our organization
visibility they will disappear from the stats.

Since we are interested in repository creation date, we need to paginate data
for the silverorange org where the number of source repos is more than 100.

A CSV is generated from the GraphQL data. Some repositories are incorrectly
considered source forks by GitHub. These are manually updated in the CSV with
a count, yes/no field. This is done so we can consistently ignore them
year-over-year.

### Android Releases

This data comes from the release history and current release information in the
Google Play Console. Data is collected manually from the console for RAP apps
in both Hippo Education and EM:RAP organizations.

### iOS Releases

This data comes from the release history in the Apple App Connect console.
Data is collected manually from the console for RAP apps in both
Hippo Education and EM:RAP organizations.

We stopped releasing the Hippo apps as of March 2022 with the inclusion of
Peds RAP.

### Platform and Language Use

This data is assembled manually by looking at active sites and apps and
cross-referencing with GitHub repositories. Mono-repos are expanded into
separate projects during counting. If sites have been retired, the retirement
date is noted in the manually assembled CSV file.

Only active sites and apps are considered. Libraries, packages, and inactive
sites are not counted.

Platforms are counted separately if there is more than one project using the
platform, otherwise they get categorized as _other_. Node and React platforms
are somewhat arbitrarily grouped together:

- Express, Apollo, jagQL, Node, Gulp -> **Node**
- Create-React-App, Next.js -> **React**
- React-Native -> **React Native**
