# Scrollscreen

Scrollscreen is a 1KB dependency free JavaScript library that positions a layer precisely on top of the browser default scrollbar allowing custom styles.


## Installation

Add CSS file to `<head>` and add JS file before end of `<body>`.


## Usage

Put the `scrollscreen` CSS class on a container. Make sure the container's height is limited somehow so it's content overflows.

```html
<style>
.scrollscreen {
    height: 100px;
}
</style>
<div class="scrollscreen">
    <h1>Hi! I'm Scrollscreen!</h1>
    <p>Scrollscreen positions a layer precisely on top of the browser default scrollbar allowing custom styles.</p>
</div>
```