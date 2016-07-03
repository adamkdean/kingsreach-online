# Contributing

Contributing to this project is something we welcome. This guide will be a very quick how to, though it may get fleshed out more in the future.

## Issues

Use issues to report problems, ask questions, suggest features and enhancements, or for any other tasks related to the project.

## Pull requests

If you want to make a change yourself, you'll have to submit a pull request.

First, always make sure you branch off of an up to date `master`:

    git checkout master
    git pull

Next, create a branch specific to the work you're doing. One issue per PR please.

    git checkout -b feature/dynamic_events_page

Do your work and commit the changes – using [semantic commit messages](http://www.adamkdean.co.uk/semantic-commit-messages) – and push the branch upstream. Please ensure that commits are atomic and not just a big bundle of code. If you have to use the word `and` in your commit messages, break it down into more commits.

    # commit backend work, for example
    git add .
    git commit -m "feat: add dynamic event logic to route"

    # commit creative work, for example
    git add .
    git commit -m "design: style event page"

    # commit tying up the frontend and the backend
    git add .
    git commit -m "feat: implement dynamic events on page"

  Finally, push it up stream:

    git push -u origin feature/dynamic_events_page

  Now navigate to GitHub and open a Pull Request from your branch. Be sure to link to the commit in your PR so that there is tracability. Wait for someone on the team to check it, and merge it. Make sure to remove the old branch. Now go back to your issue and close it.

  Thanks for contributing.
