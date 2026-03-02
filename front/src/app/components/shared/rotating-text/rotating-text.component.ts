import {
    Component,
    Input,
    OnInit,
    OnDestroy,
    ElementRef,
    ViewChild,
    AfterViewInit,
    OnChanges,
    SimpleChanges,
    ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, stagger } from 'motion';

interface TextElement {
    characters: string[];
    needsSpace: boolean;
}

@Component({
    selector: 'app-rotating-text',
    standalone: true,
    imports: [CommonModule],
    template: `
    <span
      #container
      [class]="'rotating-text-container ' + mainClassName"
      [style]="containerStyle"
    >
      <span class="sr-only">{{ texts[currentIndex] }}</span>
      <span
        #textElement
        class="rotating-text-content"
        [style]="contentStyle"
        aria-hidden="true"
      >
        <span
          *ngFor="let part of elements; let i = index"
          [class]="'rotating-split-level ' + splitLevelClassName"
          style="display: inline-flex;"
        >
          <span
            *ngFor="let char of part.characters; let j = index"
            class="rotating-char"
            [class]="elementLevelClassName"
            style="display: inline-block; white-space: pre;"
          >{{ char }}</span>
          <span *ngIf="part.needsSpace" class="rotating-space" style="white-space: pre;"> </span>
        </span>
      </span>
    </span>
  `,
    styles: [`
    .rotating-text-container {
      display: inline-flex;
      flex-wrap: wrap;
      position: relative;
      overflow: hidden;
      vertical-align: bottom;
    }
    .rotating-text-content {
      display: inline-flex;
      flex-wrap: wrap;
      position: relative;
    }
    .rotating-char {
      display: inline-block;
      will-change: transform, opacity;
    }
  `]
})
export class RotatingTextComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
    @Input() texts: string[] = [];
    @Input() mainClassName: string = '';
    @Input() splitLevelClassName: string = '';
    @Input() elementLevelClassName: string = '';
    @Input() staggerDuration: number = 0.025;
    @Input() rotationInterval: number = 2000;
    @Input() staggerFrom: 'first' | 'last' | 'center' | 'random' | number = 'last';
    @Input() splitBy: 'characters' | 'words' | 'lines' = 'characters';
    @Input() initialY: string = '100%';
    @Input() exitY: string = '-120%';

    @ViewChild('textElement') textElement!: ElementRef;

    currentIndex = 0;
    elements: TextElement[] = [];
    private intervalId: any;

    containerStyle = {
        'display': 'inline-flex',
        'flex-wrap': 'wrap',
        'position': 'relative'
    };

    contentStyle = {
        'display': 'inline-flex',
        'flex-wrap': 'wrap',
        'position': 'relative'
    };

    constructor(private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.updateElements();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['texts'] && !changes['texts'].firstChange) {
            this.updateElements();
        }
    }

    ngAfterViewInit() {
        this.startRotation();
        // Initial animation
        setTimeout(() => this.animateIn(), 100);
    }

    ngOnDestroy() {
        this.stopRotation();
    }

    updateElements() {
        const currentText = this.texts[this.currentIndex] || '';

        if (this.splitBy === 'characters') {
            const words = currentText.split(' ');
            this.elements = words.map((word, i) => ({
                characters: Array.from(word),
                needsSpace: i !== words.length - 1
            }));
        } else if (this.splitBy === 'words') {
            this.elements = currentText.split(' ').map((word, i, arr) => ({
                characters: [word],
                needsSpace: i !== arr.length - 1
            }));
        } else if (this.splitBy === 'lines') {
            this.elements = currentText.split('\n').map((line, i, arr) => ({
                characters: [line],
                needsSpace: i !== arr.length - 1
            }));
        }
    }

    startRotation() {
        this.stopRotation();
        this.intervalId = setInterval(() => {
            this.next();
        }, this.rotationInterval);
    }

    stopRotation() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    async next() {
        // 1. Animate Out
        await this.animateOut();

        // 2. Change Index
        this.currentIndex = (this.currentIndex + 1) % this.texts.length;
        this.updateElements();
        this.cdr.detectChanges();

        // 3. Wait for DOM update and Animate In
        setTimeout(() => {
            this.animateIn();
        }, 50);
    }

    private animateIn() {
        const chars = this.textElement.nativeElement.querySelectorAll('.rotating-char');
        if (!chars.length) return;

        animate(
            chars,
            {
                y: [this.initialY, '0%'],
                opacity: [0, 1]
            },
            {
                duration: 0.6,
                delay: stagger(this.staggerDuration, { from: this.staggerFrom as any }),
                // "spring" in motion DOM is a function or string
                easing: 'ease-out' // We'll use a smooth easing since DOM spring is slightly different
            }
        );
    }

    private animateOut() {
        const chars = this.textElement.nativeElement.querySelectorAll('.rotating-char');
        if (!chars.length) return Promise.resolve();

        return animate(
            chars,
            {
                y: this.exitY,
                opacity: 0
            },
            {
                duration: 0.4,
                delay: stagger(this.staggerDuration, { from: this.staggerFrom as any }),
                easing: 'ease-in'
            }
        ).finished;
    }
}
