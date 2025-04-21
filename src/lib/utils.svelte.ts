class AnimatableNumber {
    private currentValue: number = $state(0);
    private targetValue: number;
    private frameRate: number;
    private duration: number;
    private animator: NodeJS.Timeout | null = null;

    constructor(initialValue: number, frameRate: number = 60, duration: number = 500) {
        this.currentValue = initialValue;
        this.targetValue = initialValue;
        this.frameRate = frameRate;
        this.duration = duration;
        this.startAnimation();
    }

    private startAnimation() {
        if (this.animator) {
            return;
        }

        this.animator = setInterval(() => {
            const difference = this.targetValue - this.currentValue;
            if (Math.abs(difference) < 0.05) {
                this.currentValue = this.targetValue;
                if (this.animator) {
                    clearInterval(this.animator);
                    this.animator = null;
                }
                return;
            }
            this.currentValue += difference / (this.duration * (1000 / this.frameRate) / 1000);
        }, 1000 / this.frameRate);
    }

    get value() {
        return this.currentValue;
    }

    set value(newValue: number) {
        this.targetValue = newValue;
        this.startAnimation();
    }
}

export function animateNumberAsState(
    initialValue: number,
    frameRate: number = 60,
    duration: number = 500,
): AnimatableNumber {
    return new AnimatableNumber(initialValue, frameRate, duration);
}