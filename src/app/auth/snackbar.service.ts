import { inject, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

const enum SnackBarConfig {
	VERTICAL = 'top',
	HORIZONTAL = 'center',
	DURATION = 5 * 1000 // 3 sec
}

@Injectable({
	providedIn: "root",
})
export class SnackbarService {

	private snackBar = inject(MatSnackBar);

	showSnackbar(message: string): void {
		this.snackBar.open(message, 'X', {
			duration: SnackBarConfig.DURATION as number,
			horizontalPosition: SnackBarConfig.HORIZONTAL,
			verticalPosition: SnackBarConfig.VERTICAL
		});
	}
}
