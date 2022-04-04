# Form Validation Problem (Torchbox)

This is an attempt at solving the problem provided in the following repo: https://github.com/torchbox/form-validation-problem

<p align="center">
    <img src="https://i.imgur.com/OokNCZ1.gif"  />
</p>

I took the approach of keeping as faithfully to the original, simple form design as possible. I tried to only making changes in order to meet the requirements of the brief, and making some further, minimal changes to the CSS in order to improve accessibility.

I opted to avoid using any third-party packages, as the impression I got from the brief was that this would be better presented using very simple code. I'm generally much more comfortable bootstrapping my front-end code with libraries such as Material UI (who am I kidding - pretty much all of my front-end code uses MUI), so this presented a bit of a change for me.

## Considerations Discussed:

### Accessibility
All inputs have corresponding labels.

Inputs have a minimum interactive size for improved accessibility (for example, for users with Parkinson's, or other motor neurone conditions).

### Progressive enhancement
I've not come across this philosophy before, but I can understand the value in using an approach that provides a minimal, baseline experience to users who don't have the most up-to-date/functional devices (for example, users with disabilities who need to use specialist devices to access the web, or users in the developing world with old hardware/software).

If javascript is disabled on the user's device/browser then this will be a fundamental issue for this task, since React won't work. We would need to provide a redirect/fallback using simple HTML.

For other issues we could use `navigator.userAgent` to consider the user's browser, OS, device, etc and then provide different content to accomodate accordingly. 

We can cross-reference the browser version that we get from the `userAgent` against the browser support for a CSS feature, and provide alternative CSS where necessary. For example, according to W3Schools and Mozilla, CSS Grid Layout is supported by Chrome v57.0. We could check that the `userAgent`'s browser version. If the browser is an older version of Chrome, then we could implement a fallback CSS method, such as with 'float'.

We can similarly check for element attribute compatibility. For example the `<input>` element's `type` attribute can be appended with ="email". This is widely supported, but not by Edge browsers before v5.0. This means for some cases the input will fall back to being a standard `text` input. We could provide a javascript validation method as a fallback (assuming the user can use javascript).

### Testing
If I were to invest more hours into this task, I would use react-testing-library to test the DOM. To be honest I haven't used this to any significant benefit before. I've quite a few hours under my belt of using Jest for TDD of back-end code and some front-end code, but I need to spend some time practicing DOM testing.

### Browser support
As above, browser can be checked with `navigator.userAgent` and then different fallbacks can be implemented accordingly. I tend to only use features that are useable by the vast majority of users as for my use-cases it isn't worth the additional time spent coding to get the benefit of the most cutting-edge features. Equally I avoid issues concerning legacy browsers (Internet Explorer, etc), but I can imagine that if your clients include the NHS, NGO's, etc then the client-base will be broader and more accommodations will need to be made.

### Tooling
Technologies used:
* create-react-app
* typescript
* eslint