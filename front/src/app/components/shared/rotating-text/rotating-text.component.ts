import {
    Component,
    Input,
    OnInit,
    OnDestroy,
    AfterViewInit,
    ElementRef,
    ViewChild,
    ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, stagger } from 'motion';

@Component({
    selector: 'app-rotating-text',
    standalone: true,
    imports: [CommonModule],
    template: `
    <span
      class="rotating-text-main flex flex-wrap relative"
      [ngClass]="mainClassName"
      style="display: inline-flex"
    >
      <span class="sr-only">{{ texts[currentIndex] }}</span>
      <span
        #textContainer
        class="rotating-text-split relative"
        [ngClass]="splitLevelClassName"
        style="display: inline-flex; overflow: hidden;"
      >
        <span
          *ngFor="let wordObj of elements; let wIndex = index"
          class="inline-flex"
        >
          <span
            *ngFor="let char of wordObj.characters; let cIndex = index"
            class="char-element inline-block"
            [ngClass]="elementLevelClassName"
            style="will-change: transform; transform: translateY(100%); opacity: 0;"
          >
            {{ char }}
          </span>
          <span *ngIf="wordObj.needsSpace" class="whitespace-pre"> </span>
        </span>
      </span>
    </span>
  `,
    styles: [`
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }
    .flex { display: flex; }
    .flex-wrap { flex-wrap: wrap; }
    .whitespace-pre-wrap { white-space: pre-wrap; }
    .whitespace-pre { white-space: pre; }
    .relative { position: relative; }
    .inline-flex { display: inline-flex; }
    .inline-block { display: inline-block; }
  `]
})
export class RotatingTextComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() texts: string[] = [];
    @Input() mainClassName: string = '';
    @Input() splitLevelClassName: string = '';
    @Input() elementLevelClassName: string = '';

    @Input() rotationInterval: number = 2000;
    @Input() staggerDuration: number = 0.025;
    @Input() staggerFrom: 'first' | 'last' | 'center' | 'random' | number = 'first';
    @Input() loop: boolean = true;
    @Input() auto: boolean = true;
    @Input() splitBy: 'characters' | 'words' | 'lines' | string = 'characters';

    @Input() initialY: string = '100%';
    @Input() animateY: string = '0%';
    @Input() exitY: string = '-120%';
    @Input() transition = { type: 'spring', damping: 30, stiffness: 400 };

    @ViewChild('textContainer') textContainer!: ElementRef;

    currentIndex = 0;
    elements: any[] = [];
    private intervalId: any;
    private isAnimating = false;

    constructor(private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.updateElements();
    }

    ngAfterViewInit() {
        this.animateIn();
        if (this.auto && this.texts.length > 1) {
            this.intervalId = setInterval(() => this.next(), this.rotationInterval);
        }
    }

    ngOnDestroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    private splitIntoCharacters(text: string): string[] {
        if (typeof Intl !== 'undefined' && Intl.Segmenter) {
            const segmenter = new (Intl as any).Segmenter('es', { granularity: 'grapheme' });
            return Array.from(segmenter.segment(text)).map((s: any) => s.segment);
        }
        return Array.from(text);
    }

    updateElements() {
        const currentText = this.texts[this.currentIndex];

        if (this.splitBy === 'characters') {
            const words = currentText.split(' ');
            this.elements = words.map((word, i) => ({
                characters: this.splitIntoCharacters(word),
                needsSpace: i !== words.length - 1
            }));
        } else if (this.splitBy === 'words') {
            const words = currentText.split(' ');
            this.elements = words.map((word, i) => ({
                characters: [word],
                needsSpace: i !== words.length - 1
            }));
        } else {
            const lines = currentText.split(this.splitBy === 'lines' ? '\n' : this.splitBy);
            this.elements = lines.map((line, i) => ({
                characters: [line],
                needsSpace: i !== lines.length - 1
            }));
        }
    }

    async next() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        await this.animateOut();

        this.currentIndex =
            this.currentIndex === this.texts.length - 1
                ? (this.loop ? 0 : this.currentIndex)
                : this.currentIndex + 1;

        this.updateElements();
        this.cdr.detectChanges();

        await new Promise(resolve => setTimeout(resolve, 50));

        await this.animateIn();
        this.isAnimating = false;
    }

    private resolveStaggerFrom(total: number): any {
        if (this.staggerFrom === 'first') return 'first';
        if (this.staggerFrom === 'last') return 'last';
        if (this.staggerFrom === 'center') return 'center';
        if (this.staggerFrom === 'random') return Math.floor(Math.random() * total);
        if (typeof this.staggerFrom === 'number') return this.staggerFrom;
        return 'first';
    }

    private getChars() {
        if (!this.textContainer) return [];
        return this.textContainer.nativeElement.querySelectorAll('.char-element');
    }

    private animateIn() {
        const chars = this.getChars();
        if (!chars.length) return Promise.resolve();

        chars.forEach((el: HTMLElement) => {
            el.style.transform = `translateY(${this.initialY})`;
            el.style.opacity = '0';
        });

        return animate(
            chars,
            { y: [this.initialY, this.animateY], opacity: [0, 1] },
            {
                type: this.transition.type as any,
                stiffness: this.transition.stiffness,
                damping: this.transition.damping,
                delay: stagger(this.staggerDuration, { from: this.resolveStaggerFrom(chars.length) as any })
            }
        ).finished;
    }

    private animateOut() {
        const chars = this.getChars();
        if (!chars.length) return Promise.resolve();

        return animate(
            chars,
            { y: [this.animateY, this.exitY], opacity: [1, 0] },
            {
                type: this.transition.type as any,
                stiffness: this.transition.stiffness,
                damping: this.transition.damping,
                delay: stagger(this.staggerDuration, { from: this.resolveStaggerFrom(chars.length) as any })
            }
        ).finished;
    }
}
