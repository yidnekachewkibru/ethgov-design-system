import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import styles from './Typography.module.css';

export type HeadingLevel = 1 | 2 | 3 | 4;

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * The semantic heading level (`h1`–`h4`). Choose the level for correct
   * document outline; use `visualLevel` to change size without breaking
   * the outline.
   */
  level: HeadingLevel;
  /** Render at a different size than the semantic level implies. */
  visualLevel?: HeadingLevel;
}

/**
 * Heading — a semantic `h1`–`h4`.
 *
 * The level sets both the element and (by default) the size. Keep headings
 * sequential for screen-reader navigation; use `visualLevel` when the
 * visual hierarchy must differ from the document outline.
 */
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
  { level, visualLevel, className, ...rest },
  ref,
) {
  const Tag = `h${level}` as const;
  const size = visualLevel ?? level;
  return <Tag ref={ref} className={cx(styles[`h${size}`], className)} {...rest} />;
});

export type TextSize = 'sm' | 'base' | 'lg';

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  /** Render as a different element (e.g. `span`). Defaults to `p`. */
  as?: 'p' | 'span' | 'div';
  size?: TextSize;
  /** De-emphasise (secondary text colour). */
  secondary?: boolean;
}

/**
 * Text — body copy at the ETHDS type scale. Body text is `base` (16px
 * equivalent) minimum for readability.
 */
export const Text = forwardRef<HTMLParagraphElement, TextProps>(function Text(
  { as = 'p', size = 'base', secondary = false, className, ...rest },
  ref,
) {
  const Tag = as;
  return (
    <Tag
      ref={ref as never}
      className={cx(styles.text, styles[size], secondary && styles.secondary, className)}
      {...rest}
    />
  );
});
