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
    isHighlighted?: boolean;
}

@Component({
    selector: 'app-rotating-text',
    standalone: true,
    imports: [CommonModule],
    template: `
    <span
      #container
      [class]="'rotating-text-container ' + mainClassName"
    >
      <span class="sr-only">{{ texts[currentIndex] }}</span>
      <span
        #textElement
        class="rotating-text-content"
        aria-hidden="true"
      >
        <ng-container *ngFor="let part of elements; let i = index">
          <span
            class="rotating-word-clip"
            [class]="(part.isHighlighted ? highlightClassName : '') + ' ' + splitLevelClassName"
          >
            <span
              *ngFor="let char of part.characters"
              class="rotating-char"
              [class]="elementLevelClassName"
            >{{ char }}</span>
          </span>
          <span *ngIf="part.needsSpace" class="rotating-space">&nbsp;</span>
        </ng-container>
      </span>
    </span>
  `,
    styles: [`
    .rotating-text-container {
      display: inline;
      position: relative;
    }
    .rotating-text-content {
      display: inline;
    }
    .rotating-word-clip {
      display: inline-flex;
      overflow: hidden;
      padding-bottom: 0.1em;
      vertical-align: bottom;
    }
    .rotating-space {
      display: inline-block;
    }
    .rotating-char {
      display: inline-block;
      will-change: transform, opacity;
      opacity: 0;
    }
  `]
})
export class RotatingTextComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
    @Input() texts: string[] = [];
    @Input() mainClassName: string = '';
    @Input() highlightClassName: string = 'rotating-accent';
    @Input() splitLevelClassName: string = '';
    @Input() elementLevelClassName: string = '';
    @Input() staggerDuration: number = 0.025;
    @Input() rotationInterval: number = 2000;
    @Input() staggerFrom: 'first' | 'last' | 'center' | 'random' | number = 'first';
    @Input() splitBy: 'characters' | 'words' | 'lines' = 'characters';
    @Input() initialY: string = '100%';
    @Input() exitY: string = '-120%';

    @ViewChild('textElement') textElement!: ElementRef;

    currentIndex = 0;
    elements: TextElement[] = [];
    private intervalId: any;

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
        const rawText = this.texts[this.currentIndex] || '';

        if (this.splitBy === 'words' || this.splitBy === 'characters') {
            const words = rawText.split(' ');
            this.elements = words.map((word, i) => {
                let isHighlighted = false;
                let processedWord = word;

                if (word.startsWith('[') && word.endsWith(']')) {
                    isHighlighted = true;
                    processedWord = word.substring(1, word.length - 1);
                }

                return {
                    characters: this.splitBy === 'characters' ? Array.from(processedWord) : [processedWord],
                    needsSpace: i !== words.length - 1,
                    isHighlighted
                };
            });
        } else if (this.splitBy === 'lines') {
            this.elements = rawText.split('\n').map((line, i, arr) => ({
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

        // Set initial position instantly (no flash)
        animate(chars, { y: '100%', opacity: 0 }, { duration: 0 });

        animate(
            chars,
            { y: '0%', opacity: 1 },
            {
                duration: 0.55,
                delay: stagger(this.staggerDuration, { from: this.staggerFrom as any }),
                ease: [0.22, 1, 0.36, 1]
            }
        );
    }

    private animateOut() {
        const chars = this.textElement.nativeElement.querySelectorAll('.rotating-char');
        if (!chars.length) return Promise.resolve();

        return animate(
            chars,
            { y: '-110%', opacity: 0 },
            {
                duration: 0.35,
                delay: stagger(this.staggerDuration, { from: this.staggerFrom as any }),
                ease: [0.64, 0, 0.78, 0]
            }
        ).finished;
    }
}
