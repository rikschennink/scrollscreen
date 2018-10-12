# Scrollscreen

Scrollscreen is a 1KB dependency free JavaScript library that positions a layer precisely on top of the browser default scrollbar in turn allowing custom styles.

Tested on IE11, Edge, Firefox, Chrome, Safari and iOS.

<img src="https://github.com/rikschennink/scrollscreen/blob/master/demo.gif?raw=true" width="370" alt=""/>

## Installation

Add CSS file to `<head>` and add JS file before end of `<body>`.


## Usage

Put the `scrollscreen` CSS class on a container. Make sure the container's height is limited somehow so it's content overflows.

```html
<style>
.scrollscreen--track {
    /* width of track, 18px covers native track on MacOS and Windows */
    width:18px;
    background:#bebec1;
}

.scrollscreen--slider {
    /* use for spacing between slider and track */
    padding:.25em;
}

.scrollscreen--slider::after {
    /* the slider button style */
    background:#5f6165;
    border-radius:9999em;
}
    
.scrollscreen {
    /* set scrollscreen to a fixed height to make scrollbars appear */
    height: 100px;
}
</style>
<div class="scrollscreen">
    <h1>Hi! I'm Scrollscreen!</h1>
    <p>Scrollscreen positions a layer precisely on top of the browser default scrollbar allowing custom styles.</p>
</div>
```
