import { Request, Response, Router } from "express";
import { createAuditReplayService } from "../services/auditReplayService";

const router = Router();
const auditReplayService = createAuditReplayService();

router.post("/record", (req: Request, res: Response) => {
  const {
    strategyId,
    inputs,
    outputs,
    intermediateScores,
    executionTime,
    status,
    error,
  } = req.body ?? {};

  if (!strategyId || !inputs || !outputs || !intermediateScores) {
    res.status(400).json({
      error:
        "Expected strategyId, inputs, outputs, and intermediateScores in request body.",
    });
    return;
  }

  const record = auditReplayService.recordStrategyExecution(
    String(strategyId),
    inputs,
    outputs,
    intermediateScores,
    Number(executionTime ?? 0),
    status === "failed" || status === "partial" ? status : "success",
    error ? String(error) : undefined,
  );

  res.status(201).json(record);
});

router.get("/summary", async (req: Request, res: Response) => {
  const strategyId = String(req.query.strategyId || "default-strategy");
  const limitRaw = Number(req.query.limit ?? 25);
  const limit = Number.isFinite(limitRaw) ? Math.max(1, Math.min(200, limitRaw)) : 25;

  try {
    const report = await auditReplayService.replaySummary(strategyId, limit);
    res.json({
      success: true,
      data: {
        summary: {
          total: report.total,
          deterministicCount: report.deterministicCount,
          discrepancyCount: report.discrepancyCount,
          mismatchRate:
            report.total === 0
              ? 0
              : Number((report.discrepancyCount / report.total).toFixed(4)),
        },
        items: report.items,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Replay summary failed",
    });
  }
});

export default router;
