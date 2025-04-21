class AnimatableNumber {
    private currentValue: number = $state(0);
    private targetValue: number;
    private animator: NodeJS.Timeout;

    constructor(initialValue: number, frameRate: number = 60, duration: number = 500) {
        this.currentValue = initialValue;
        this.targetValue = initialValue;
        this.animator = setInterval(() => {
            const difference = this.targetValue - this.currentValue;
            if (Math.abs(difference) < 0.01) {
                this.currentValue = this.targetValue;
                return;
            }
            this.currentValue += difference / (duration * (1000 / frameRate) / 1000);
        }, 1000 / frameRate);
    }

    get value() {
        return this.currentValue;
    }

    set value(newValue: number) {
        this.targetValue = newValue;
    }
}

export function animateNumberAsState(
    initialValue: number,
    frameRate: number = 60,
    duration: number = 500,
): AnimatableNumber {
    return new AnimatableNumber(initialValue, frameRate, duration);
}