export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  roi: string;
  metrics: { label: string; value: string }[];
  problem: string;
  solution: string;
  adr: {
    title: string;
    status: string;
    context: string;
    decision: string;
    consequences: string;
  };
  codeSnippet: {
    language: string;
    code: string;
    highlightedLines: number[];
  };
  tech: string[];
  videoSrc?: string;
  imageSrc?: string;
  posterSrc?: string;
}

export const projectsData: Record<string, Project> = {
  amolnama: {
    slug: "amolnama",
    title: "Amolnama",
    subtitle: "Real-time National Event Scraper & Data Pipeline",
    description: "A digital ledger and automated scraping system running 10+ concurrent bots to aggregate, verify, and log national statistics in real-time.",
    category: "Data Pipelines & Automation",
    roi: "99.9% aggregation accuracy with <500ms delay",
    metrics: [
      { label: "Scraper Bots Running", value: "10+" },
      { label: "Data Delay Margin", value: "< 500ms" },
      { label: "Daily Transactions", value: "120K+" },
      { label: "System Uptime", value: "99.99%" },
    ],
    problem: "National statistics were highly fragmented, published across outdated APIs and poorly structured tables, causing delays of up to 48 hours for data correlation.",
    solution: "Built a fully autonomous orchestrator that triggers sandboxed Node/Puppeteer micro-scrapers, parses dynamic content in memory, validates the schemas, and pipes deduplicated streams into PostgreSQL.",
    adr: {
      title: "ADR-004: Decoupling Scraper Ingestion from API Layer",
      status: "Approved",
      context: "Processing live scrapers on the main API server caused severe HTTP request latency and occasional process blocking during dense parsing phases.",
      decision: "We decoupled ingestion by deploying Puppeteer runtimes on serverless cloud functions, feeding a Redis queue that writes asynchronously to PostgreSQL.",
      consequences: "Eliminated server blocking. Main API response time settled back to a stable 40ms, while ingestion scaled elastically up to 50 concurrent scraping sessions.",
    },
    codeSnippet: {
      language: "typescript",
      code: `// Serverless Scraper worker executing on Edge
export async function scrapeEventSource(url: string) {
  const browser = await puppeteer.connect({
    browserWSEndpoint: process.env.BROWSERLESS_WS_URL,
  });
  
  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 8000 });
    
    const rawData = await page.evaluate(() => {
      const rows = document.querySelectorAll(".event-log-row");
      return Array.from(rows).map(row => ({
        id: row.getAttribute("data-id"),
        value: row.querySelector(".value")?.textContent?.trim(),
        timestamp: Date.now()
      }));
    });

    // Pipe directly to Redis Ingestion Queue
    await redis.lpush("ingestion:events", JSON.stringify(rawData));
    return { success: true, count: rawData.length };
  } finally {
    await browser.close();
  }
}`,
      highlightedLines: [15, 16, 20],
    },
    tech: ["Next.js", "Puppeteer", "Redis", "PostgreSQL", "Tailwind CSS"],
    videoSrc: "/videos/abstract-data-flows.mp4",
  },
  componeo: {
    slug: "componeo",
    title: "Componeo",
    subtitle: "High-Performance Component Registry Backend",
    description: "An enterprise-grade component registry with dynamic analytics tracking, real-time imports, and seamless next/supabase synchronization.",
    category: "DevOps & Core Tools",
    roi: "95% developer productivity speedups across internal squads",
    metrics: [
      { label: "Active Components", value: "350+" },
      { label: "Import Speed (Edge)", value: "32ms" },
      { label: "Monthly API Requests", value: "2.4M" },
      { label: "Bundle Size Savings", value: "40%" },
    ],
    problem: "Squads were building duplicate UI components and uploading slow, un-optimized assets, bloating client-side bundles and hurting SEO performance.",
    solution: "Designed a secure web registry that parses files on upload, performs semantic size checks, isolates stylesheets, and exposes code with zero-dependency bundlers.",
    adr: {
      title: "ADR-012: In-Memory Component Bundler",
      status: "Approved",
      context: "Writing static CSS/JS builds to physical disks inside registry nodes created standard filesystem bottlenecks and scaled poorly.",
      decision: "We implemented an in-memory ESM bundler using rollup/esbuild backed by Redis edge caches to ship direct drop-in codes instantly.",
      consequences: "Registry build-and-ship times fell from 1.8 seconds to 32 milliseconds, completely side-stepping disk IO bottlenecks.",
    },
    codeSnippet: {
      language: "typescript",
      code: `// In-Memory esbuild bundler execution
import * as esbuild from "esbuild-wasm";

export async function bundleComponent(source: string) {
  const result = await esbuild.transform(source, {
    loader: "tsx",
    minify: true,
    target: "es2022",
    format: "esm",
    jsx: "automatic"
  });

  return {
    code: result.code,
    sizeInBytes: new TextEncoder().encode(result.code).length
  };
}`,
      highlightedLines: [5, 6, 7, 8],
    },
    tech: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS", "esbuild"],
    imageSrc: "/images/componeo.png",
  },
  izzan: {
    slug: "izzan",
    title: "Izzan",
    subtitle: "High-Traffic E-Commerce Microservices",
    description: "Dynamic full-stack transactional ecosystem featuring stripe payments, live shipment tracking, and automated inventory sync loops.",
    category: "Full-Stack E-Commerce",
    roi: "Zero cart-sync discrepancies on 10K concurrent users",
    metrics: [
      { label: "Concurrent Visitors", value: "10K" },
      { label: "Transaction Margin", value: "100%" },
      { label: "Sync Fail Rate", value: "0.00%" },
      { label: "Conversion Lift", value: "+ 18%" },
    ],
    problem: "Database race conditions during flash-sales caused over-selling and transaction mismatches on high-demand inventory.",
    solution: "Engineered transactional locking schemas within Prisma utilizing PostgreSQL isolated transaction levels, paired with instant optimistic UI state syncs.",
    adr: {
      title: "ADR-008: Optimistic DB Locking for Flash Sales",
      status: "Approved",
      context: "Pessimistic table locking blocked concurrent readers, causing database connection pool exhausting during high-concurrency checkouts.",
      decision: "Switched to optimistic concurrency control using version numbers in the inventory table, dropping invalid transactions gracefully with automatic retries.",
      consequences: "Database pool utilization dropped by 70% under stress. Cart checkout times averaged 110ms with zero instances of double-selling.",
    },
    codeSnippet: {
      language: "typescript",
      code: `// Secure transactional item checkout loop
export async function secureCheckout(productId: string, userId: string) {
  return await prisma.$transaction(async (tx) => {
    // 1. Fetch item with version verification
    const product = await tx.product.findUnique({
      where: { id: productId }
    });

    if (!product || product.stock <= 0) {
      throw new Error("OUT_OF_STOCK");
    }

    // 2. Perform optimistic decrement
    const updated = await tx.product.updateMany({
      where: {
        id: productId,
        version: product.version // Verify version remains unchanged
      },
      data: {
        stock: { decrement: 1 },
        version: { increment: 1 }
      }
    });

    if (updated.count === 0) {
      throw new Error("RACE_CONDITION_RETRY");
    }
  });
}`,
      highlightedLines: [15, 16, 17, 26],
    },
    tech: ["Next.js", "Prisma", "PostgreSQL", "Stripe", "Framer Motion"],
    imageSrc: "/images/izzan.png",
  },
  vortexa: {
    slug: "vortexa",
    title: "Vortexa",
    subtitle: "Cloud Database Hosting & Orchestrator",
    description: "An intuitive web hosting dashboard with direct database container spinning, CPU utilization rings, and secure Docker sandbox loops.",
    category: "Cloud Architecture",
    roi: "Container spin-up time lowered to <1.5s globally",
    metrics: [
      { label: "Containers Live", value: "4.5K" },
      { label: "Spin-up Latency", value: "< 1.5s" },
      { label: "Bandwidth Saved", value: "3.2 TB" },
      { label: "Health Check Time", value: "250ms" },
    ],
    problem: "Spinning up new database nodes on general cloud clusters took up to 45 seconds, ruining live playground onboarding experiences.",
    solution: "Designed a lightweight cluster coordinator using Go-based agent daemons on Linux hosts that spins isolated Docker containers via internal Unix sockets.",
    adr: {
      title: "ADR-021: Micro-container Pre-warming",
      status: "Approved",
      context: "On-demand docker image pulls and volume configurations created un-avoidable container spin-up delays.",
      decision: "We pre-warmed a pool of 10 standby, unassigned database containers with minimized RAM boundaries, mapping active sockets upon user click.",
      consequences: "Onboarding spin-ups fell from 45 seconds to a blazing 1.2 seconds, securing top-tier playground interactions.",
    },
    codeSnippet: {
      language: "typescript",
      code: `// Pre-warmed Container Allocation Controller
export async function allocatePrewarmedContainer(userId: string) {
  const container = await redis.rpop("containers:prewarmed:pool");
  if (!container) {
    return await spinOnDemandContainer(userId);
  }

  const data = JSON.parse(container);
  
  // Re-bind network bridge asynchronously
  await docker.assignUserToContainer(data.containerId, userId);
  
  // Track allocation state
  await prisma.allocation.create({
    data: { userId, containerId: data.containerId, active: true }
  });

  return { ip: data.ip, port: data.port, id: data.containerId };
}`,
      highlightedLines: [3, 4, 11, 14],
    },
    tech: ["React", "Node.js", "Docker", "Redis", "MongoDB"],
    imageSrc: "/images/vortexa.png",
  },
};
