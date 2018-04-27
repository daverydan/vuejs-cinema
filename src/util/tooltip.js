import { addClass, removeClass } from './helpers';

let mouseOverHandler = function(event) {
	// console.log('mouseover');
	// console.log(event.target);
	let span = event.target.parentNode.getElementsByTagName('SPAN')[0];
	// console.log(span);
	addClass(span, 'tooltip-show');
}
let mouseOutHandler = function(event) {
	// console.log('mouseout');
	let span = event.target.parentNode.getElementsByTagName('SPAN')[0];
	removeClass(span, 'tooltip-show');
}

export default {
	install(Vue) {
		Vue.directive('tooltip', {
			// element, values passed
			bind(el, bindings) {
				// console.log(el);
				// console.log(bindings);
				let span = document.createElement('SPAN');
				let text = document.createTextNode(`Seats available: ${bindings.value.seats}`);
				span.appendChild(text);
				addClass(span, 'tooltip');
				el.appendChild(span);
				let div = el.getElementsByTagName('DIV')[0];
				div.addEventListener('mouseover', mouseOverHandler);
				div.addEventListener('mouseout', mouseOutHandler);
				div.addEventListener('touchstart', mouseOverHandler);
				div.addEventListener('touchend', mouseOutHandler);
			},
			// removeEventListener(s) when element is removed from DOM
			unbind(el) {
				let div = el.getElementsByTagName('DIV')[0];
				div.removeEventListener('mouseover', mouseOverHandler);
				div.removeEventListener('mouseout', mouseOutHandler);
				div.removeEventListener('touchstart', mouseOverHandler);
				div.removeEventListener('touchend', mouseOutHandler);
			}
		});
	}
}