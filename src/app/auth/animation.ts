import { animate, keyframes, style, transition, trigger } from "@angular/animations";

export const loginAnimation = trigger(
	'loginAnimation',
	[
		transition(
			'void => *', [
				animate(800, keyframes([
					style( {opacity: 0, transform: 'translateY(-100px)', offset: 0}),
					style( {opacity: .2, transform: 'translateY(-50px)', offset: .2}),
					style( {opacity: .4, transform: 'translateY(-10px)', offset: .4}),
					style( {opacity: 1, transform: 'translateY(0px)', offset: 1.0})
				]))
			]
		)
	]
)
