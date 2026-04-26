import { unit, colors, spaces } from './chaiContainer/units.js'

const defaultAttribute = {
    'w': 'width',
    'h': 'height',
    'p': 'padding',
    'pl': 'padding-left',
    'pr': 'padding-right',
    'pt': 'padding-top',
    'pb': 'padding-bottom',
    "m": "margin",
    'ml': 'margin-left',
    'mr': 'margin-right',
    'mt': 'margin-top',
    'mb': 'margin-bottom',
    'bg': 'background',
    'b': 'border',
    'textColor': 'color',
    'text': 'font-size',
    'g': 'gap',
    'justify': 'justify-content',
    'items': 'align-items',
    'borderRadii': 'border-radius',
    'borderColor': 'border-color',
    'border': 'border-width',
    'flex': 'display: flex;',
    'grid': 'display: grid;',
    'col': 'flex-direction: column;',
    'row': 'flex-direction: row;',
    'font': 'font-weight',
    'align': 'text-align',
    'tracking': 'letter-spacing',
    'leading': 'line-height',
    'decoration': 'text-decoration',
    'pos': 'position',
    'd': 'display',
    'z': 'z-index',
    'top': 'top',
    'bottom': 'bottom',
    'left': 'left',
    'right': 'right',
    'overflow': 'overflow',
    'shadow': 'box-shadow',
    'opacity': 'opacity',
    'cursor': 'cursor',
    'min': 'min-width',
    'max': 'max-width',
    'inset': 'inset',
    'hidden':'hidden'
}

const allTags = document.body.querySelectorAll("*");

function styles(ellement) {

    let styleString = ''

    ellement.classList.forEach(clas => {
        const splittedClass = clas.split('-');
        const isclassChai = splittedClass[0] === "chai"
        const presentInDefault = defaultAttribute[splittedClass[1]]

        if (isclassChai) {
            if (presentInDefault && colors[splittedClass[2]]) {
                let colorObj = colors[splittedClass[2]];
                let colorValue = colorObj[splittedClass[3]]
                if (splittedClass[2] === "black" || splittedClass[2] === 'white') {
                    styleString += `${defaultAttribute[splittedClass[1]]}:${splittedClass[2]} ;`
                }
                else {
                    styleString += `${defaultAttribute[splittedClass[1]]}:${colorValue} ;`
                }
            }
            else if (presentInDefault && unit[splittedClass[2]]) {
                const unitEntered = unit[splittedClass[2]]
                styleString += `${defaultAttribute[splittedClass[1]]}:${unitEntered === 'full'
                    ? (presentInDefault === "h"
                        ? unitEntered + 'vh'
                        : (presentInDefault === 'w' ? unitEntered + 'vw' : unitEntered))
                    : unitEntered} ;`

            }
            else if (presentInDefault && unit[splittedClass[2]]) {
                const unitEntered = unit[splittedClass[2]]
                styleString += `${defaultAttribute[splittedClass[1]]}:${unitEntered} ;`
            }
            else if (splittedClass[1] === "flex" || splittedClass[1] === "grid" || splittedClass[1] === "col" || splittedClass[1] === "row") {
                styleString += `${defaultAttribute[splittedClass[1]]} ;`
            }
            else if (presentInDefault && spaces[splittedClass[2]]) {
                styleString += `${defaultAttribute[splittedClass[1]]}:${spaces[splittedClass[2]]} ;`
            }
        }
        if (presentInDefault === 'z') {
            console.log(styleString);
        }
    });

    ellement.style.cssText = styleString;
}
allTags.forEach(ele => styles(ele))
styles(document.body)

const observer = new MutationObserver((mutationsList) => {

    for (const mutation of mutationsList) {


        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            styles(mutation.target);
        }

        else if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(node => {

                if (node.nodeType === 1) {
                    styles(node);
                    node.querySelectorAll('*').forEach(child => styles(child));
                }
            });
        }
    }
});


const observerConfig = {
    attributes: true,
    attributeFilter: ['class'],
    childList: true,
    subtree: true
};


observer.observe(document.body, observerConfig);
