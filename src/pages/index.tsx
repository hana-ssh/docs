import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Cloud,
  Download,
  Rocket,
  SquareTerminal,
  type LucideIcon,
} from 'lucide-react';

import styles from './index.module.css';

interface Section {
  icon: LucideIcon;
  title: string;
  description: string;
  to: string;
}

const SECTIONS: Section[] = [
  {
    icon: Rocket,
    title: 'Getting started',
    description: 'What Hana is, how the pieces fit together and where to begin.',
    to: '/docs/intro',
  },
  {
    icon: SquareTerminal,
    title: 'Hana Desktop',
    description: 'Terminal, SFTP, port forwarding, host insights, snippets and workspaces.',
    to: '/docs/desktop',
  },
  {
    icon: Bot,
    title: 'Agent',
    description: 'Run tasks in your sessions with your own model provider and MCP servers.',
    to: '/docs/agent',
  },
  {
    icon: Cloud,
    title: 'Hana Cloud',
    description: 'End-to-end encrypted vault sync, shared vaults and shared sessions.',
    to: '/docs/cloud',
  },
];

const LINKS = [
  {label: 'Download Hana Desktop', href: 'https://hanassh.com/download'},
  {label: 'Theme marketplace', href: 'https://marketplace.hanassh.com/'},
  {label: 'Plans & pricing', href: 'https://hanassh.com/#pricing'},
  {label: 'Service status', href: 'https://status.seventy7.dev/'},
];

function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroGlow} aria-hidden />
      <div className={styles.heroInner}>
        <div className="hana-eyebrow">Documentation</div>
        <Heading as="h1" className={styles.heroTitle}>
          Learn to get the most out of <span className={styles.accent}>Hana</span>.
        </Heading>
        <p className={styles.heroLead}>
          Guides and reference for Hana Desktop, the built-in agent and Hana Cloud, the SSH client
          for macOS, Windows and Linux.
        </p>
        <div className={styles.heroActions}>
          <Link className={styles.buttonPrimary} to="/docs/intro">
            Read the docs
            <ArrowRight size={14} strokeWidth={2} />
          </Link>
          <Link className={styles.buttonSecondary} href="https://hanassh.com/download">
            <Download size={14} strokeWidth={2} />
            Download Hana
          </Link>
        </div>
      </div>
    </header>
  );
}

function SectionCard({icon: Icon, title, description, to}: Section) {
  return (
    <Link className={styles.card} to={to}>
      <Icon className={styles.cardIcon} size={18} strokeWidth={1.75} />
      <Heading as="h3" className={styles.cardTitle}>
        {title}
      </Heading>
      <p className={styles.cardDescription}>{description}</p>
      <span className={styles.cardMore}>
        Browse <ArrowRight size={13} strokeWidth={2} />
      </span>
    </Link>
  );
}

function Preview() {
  return (
    <div className={styles.preview}>
      <div className={styles.previewGlow} aria-hidden />
      {/* hana-app.png has a white margin and drop shadow baked in. The image is oversized and
          offset so only the window shows through the frame, as on hanassh.com. */}
      <div className={styles.previewFrame}>
        <img
          className={styles.previewImage}
          src={useBaseUrl('/img/screens/hana-app.png')}
          alt="Hana Desktop with the Assistant panel open next to the host list"
          loading="lazy"
          draggable={false}
        />
      </div>
      <div className={styles.previewFade} aria-hidden />
    </div>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Documentation"
      description="Guides and reference for Hana Desktop, the Hana agent and Hana Cloud.">
      <Hero />
      <main className={styles.main}>
        <section className={styles.grid}>
          {SECTIONS.map((section) => (
            <SectionCard key={section.title} {...section} />
          ))}
        </section>

        <section className={styles.links}>
          {LINKS.map(({label, href}) => (
            <Link key={label} className={styles.link} href={href}>
              {label}
              <ArrowUpRight size={14} strokeWidth={2} />
            </Link>
          ))}
        </section>

        <Preview />
      </main>
    </Layout>
  );
}
