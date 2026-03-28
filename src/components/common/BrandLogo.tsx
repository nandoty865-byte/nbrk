import { BRANDING } from '@/config/branding';

type BrandLogoProps = {
  compact?: boolean;
};

export default function BrandLogo({ compact = false }: BrandLogoProps) {
  return (
    <div className="brand-logo" aria-label={BRANDING.name}>
      <span className="brand-logo__mark">{BRANDING.shortName}</span>
      {!compact ? (
        <span>
          <strong>{BRANDING.name}</strong>
          <small>{BRANDING.tagline}</small>
        </span>
      ) : null}
    </div>
  );
}
