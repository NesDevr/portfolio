import { useId } from "react";
import {
  FileScan, ScanSearch, ShieldCheck, DraftingCompass, Network,
  Files, Database, SlidersHorizontal, ListChecks,
} from "lucide-react";

const workflows = {
  assistant: {
    label: "Manufacturing AI assistant", color: "#287aa1", tint: "#e7f3f8",
    stages: [
      { label: "Customer request", detail: "Chat + context", icon: Files },
      { label: "Retrieve + plan", detail: "Documents + graph", icon: Network },
      { label: "Validated tools", detail: "Permissions + confirmation", icon: ShieldCheck },
    ],
  },
  pricing: {
    label: "Manufacturing cost prediction", color: "#a66c24", tint: "#fbf0df",
    stages: [
      { label: "CAD + parameters", detail: "Geometry + material", icon: DraftingCompass },
      { label: "ML prediction", detail: "PyTorch + XGBoost", icon: Network },
      { label: "Cost + review", detail: "Flag unusual estimates", icon: ListChecks },
    ],
  },
  infrastructure: {
    label: "Production Kubernetes delivery", color: "#287aa1", tint: "#e7f3f8",
    stages: [
      { label: "Build + validate", detail: "GitHub Actions + Docker", icon: ListChecks },
      { label: "AKS workloads", detail: "Terraform + Kubernetes", icon: Network },
      { label: "Health + metrics", detail: "Probes + monitoring", icon: ScanSearch },
    ],
  },
  analytics: {
    label: "Manufacturing analytics pipeline", color: "#527a43", tint: "#edf4e7",
    stages: [
      { label: "Bronze", detail: "Raw manufacturing records", icon: Database },
      { label: "Silver", detail: "Clean + validate", icon: SlidersHorizontal },
      { label: "Gold", detail: "SQL analytics + dashboards", icon: ListChecks },
    ],
  },
  redaction: {
    label: "Document intelligence", color: "#287aa1", tint: "#e7f3f8",
    stages: [
      { label: "PDF + OCR", detail: "Extract text & regions", icon: FileScan },
      { label: "Classification", detail: "Models + spatial rules", icon: ScanSearch },
      { label: "Redaction", detail: "Apply removal policies", icon: ShieldCheck },
    ],
  },
  ppap: {
    label: "Manufacturing intelligence", color: "#527a43", tint: "#edf4e7",
    stages: [
      { label: "Drawing", detail: "Structured extraction", icon: DraftingCompass },
      { label: "Generate reports", detail: "Flowchart · PFMEA · Plan", icon: Network },
      { label: "Consistency", detail: "Cross-document checks", icon: Files },
    ],
  },
  reconciliation: {
    label: "Financial data pipeline", color: "#a66c24", tint: "#fbf0df",
    stages: [
      { label: "FIX + CSV", detail: "Transactions & reports", icon: Database },
      { label: "Transform", detail: "Map, filter & normalize", icon: SlidersHorizontal },
      { label: "Reconcile", detail: "Activity & account totals", icon: ListChecks },
    ],
  },
};

export type WorkflowKind = keyof typeof workflows;

export function WorkflowPreview({ kind, expanded = false }: {
  kind: WorkflowKind;
  expanded?: boolean;
}) {
  const id = useId();
  const flow = workflows[kind];

  return (
    <div className={`flex items-center justify-center overflow-hidden bg-[#f8faf7] ${expanded ? "px-2 py-6 sm:px-10 sm:py-10" : "h-full px-2"}`}>
      <svg
        viewBox="0 0 640 300"
        role="img"
        aria-labelledby={`${id}-title ${id}-description`}
        className={`block w-full ${expanded ? "max-w-3xl" : "h-full"}`}
        style={{ fontFamily: "inherit" }}
      >
        <title id={`${id}-title`}>{flow.label}</title>
        <desc id={`${id}-description`}>
          {flow.stages.map((stage) => `${stage.label}: ${stage.detail}`).join(" → ")}.
        </desc>
        <defs>
          <pattern id={`${id}-dots`} width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="#dce3da" />
          </pattern>
        </defs>
        <rect width="640" height="300" fill={`url(#${id}-dots)`} />
        {flow.stages.slice(1).map((stage, index) => {
          const x = 200 + index * 184;
          return (
            <g key={stage.label} fill="none" stroke="#7f8e83" strokeWidth="1.6" strokeLinejoin="round">
              <path d={`M ${x} 149 H ${x + 50}`} />
              <path d={`m ${x + 44} 145 6 4 -6 4`} />
            </g>
          );
        })}
        {flow.stages.map((stage, index) => {
          const x = 72 + index * 184;
          const Icon = stage.icon;
          return (
            <g key={stage.label}>
              <rect x={x} y="96" width="128" height="106" rx="10" fill="#26382d" opacity="0.06" transform="translate(0 4)" />
              <rect x={x} y="96" width="128" height="106" rx="10" fill="#ffffff" stroke="#c9d5ca" />
              <rect x={x + 42} y="112" width="44" height="44" rx="10" fill={flow.tint} />
              <Icon x={x + 51} y="121" width="26" height="26" color={flow.color} strokeWidth="1.6" aria-hidden="true" />
              <text x={x + 64} y="177" textAnchor="middle" fill="#263b2d" fontSize="14" fontWeight="700">{stage.label}</text>

            </g>
          );
        })}
      </svg>
    </div>
  );
}
