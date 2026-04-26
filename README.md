# ![](./favicon/favicon.ico) chaiWind

![Version](https://img.shields.io/badge/version-2.0-orange.svg)
![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)
![Zero Config](https://img.shields.io/badge/config-zero-blue.svg)

**ChaiWind** is a lightning-fast, inline-first CSS utility engine built entirely from scratch.

It ditches the build steps, compilers, and bloated stylesheets. Instead, it uses a lightweight JavaScript engine to parse your DOM at runtime, intercept utility classes, and inject mapped values directly into the element's inline `style` attribute.

## 🚀 Why ChaiWind?

I built this project to deeply understand how utility-first CSS frameworks operate under the hood. While massive tools rely on heavy Node.js compilers (like PostCSS), ChaiWind runs purely in the browser, making it the ultimate tool for rapid prototyping and lightweight applications.

* **Zero Configuration:** No `package.json`, no Webpack, no build step. Just link the script.
* **Inline-First Architecture:** Styles are injected straight into the DOM (`style="..."`).
* **Live DOM Observation:** Powered by a built-in `MutationObserver`. It watches your DOM for dynamically injected HTML or classes changed via DevTools and styles them instantly.
* **Modern Color Science:** Ships with a meticulously crafted OKLCH color palette for perfectly balanced, perceptually uniform shades.
* **Fluid Units:** A strict mapping dictionary for typography, spacing, and layout control.

## 🛠️ How it Works

ChaiWind queries the DOM for elements containing the `chai-` prefix. It then splits the string and maps the requested properties to a predefined token dictionary (`units.js`).

For example, when the engine sees:
`<div class="chai-bg-zinc-900 chai-p-4 chai-flex chai-row">`

It parses the tokens and instantly outputs:
`<div style="background: oklch(21% 0.006 285.885); padding: 16px; display: flex; flex-direction: row;">`

## 📦 Installation & Usage

Because ChaiWind is a client-side runtime parser, installation takes two seconds.

1. Clone or download `chaiWind.js` and `units.js` to your project directory.
2. Link `chaiWind.js` in your HTML `<head>` using `type="module"`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My ChaiWind App</title>

    <script type="module" src="./chaiWind.js" defer></script>
</head>
<body class="chai-bg-zinc-950 chai-textColor-zinc-50 chai-p-10">

    <div class="chai-flex chai-col chai-g-4 chai-p-8 chai-bg-zinc-900 chai-borderRadii-4">
        <h1 class="chai-text-8 chai-textColor-orange-500">Hello, Chai!</h1>
        <p class="chai-text-4">Brewing UI has never been faster.</p>
    </div>

</body>
</html>