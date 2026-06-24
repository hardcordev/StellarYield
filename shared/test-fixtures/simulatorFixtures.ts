/**
 * Shared simulator test fixtures for client and server tests.
 * These canonical fixtures ensure client and server simulator logic remains in sync.
 */

export interface SimulatorFixture {
  description: string;
  input: {
    strategyId: string;
    amount: number;
    token: string;
  };
  expectedOutput: {
    // Fee expectations
    hasEntryFee: boolean;
    hasNetworkFee: boolean;
    expectedFeesLength: number;
    
    // Allocation expectations
    minAllocations: number;
    allAllocationsPositive: boolean;
    allocationsSum: number; // should equal (amount - entryFee)
    
    // Share expectations
    expectedSharesLessThanNetAmount: boolean;
    
    // APY expectations
    expectedApyRange: { min: number; max: number };
    
    // Warnings
    expectedWarnings: {
      highSlippage?: boolean;
      insufficientLiquidity?: boolean;
      unsupported?: boolean;
    };
    
    // Routing
    hasValidRoutingPath: boolean;
  };
}

/**
 * Canonical simulator test fixtures.
 * These represent typical usage patterns and edge cases.
 */
export const SIMULATOR_FIXTURES: SimulatorFixture[] = [
  {
    description: "Basic small deposit (1000 units)",
    input: {
      strategyId: "blend-stable",
      amount: 1000,
      token: "USDC",
    },
    expectedOutput: {
      hasEntryFee: true,
      hasNetworkFee: true,
      expectedFeesLength: 2,
      minAllocations: 1,
      allAllocationsPositive: true,
      allocationsSum: 999, // ~1000 - 1 entry fee (0.1%)
      expectedSharesLessThanNetAmount: true,
      expectedApyRange: { min: 1, max: 30 },
      expectedWarnings: {
        highSlippage: false,
        insufficientLiquidity: false,
        unsupported: false,
      },
      hasValidRoutingPath: true,
    },
  },
  {
    description: "Medium deposit (50000 units)",
    input: {
      strategyId: "blend-stable",
      amount: 50000,
      token: "USDC",
    },
    expectedOutput: {
      hasEntryFee: true,
      hasNetworkFee: true,
      expectedFeesLength: 2,
      minAllocations: 1,
      allAllocationsPositive: true,
      allocationsSum: 49950, // ~50000 - 50 entry fee
      expectedSharesLessThanNetAmount: true,
      expectedApyRange: { min: 1, max: 30 },
      expectedWarnings: {
        highSlippage: false,
        insufficientLiquidity: false,
        unsupported: false,
      },
      hasValidRoutingPath: true,
    },
  },
  {
    description: "Large deposit with high slippage warning (150000 units)",
    input: {
      strategyId: "blend-stable",
      amount: 150000,
      token: "USDC",
    },
    expectedOutput: {
      hasEntryFee: true,
      hasNetworkFee: true,
      expectedFeesLength: 2,
      minAllocations: 1,
      allAllocationsPositive: true,
      allocationsSum: 149850, // ~150000 - 150 entry fee
      expectedSharesLessThanNetAmount: true,
      expectedApyRange: { min: 1, max: 30 },
      expectedWarnings: {
        highSlippage: true, // Over 100k triggers slippage warning
        insufficientLiquidity: false,
        unsupported: false,
      },
      hasValidRoutingPath: true,
    },
  },
  {
    description: "Very large deposit with liquidity warning (2000000 units)",
    input: {
      strategyId: "blend-stable",
      amount: 2000000,
      token: "USDC",
    },
    expectedOutput: {
      hasEntryFee: true,
      hasNetworkFee: true,
      expectedFeesLength: 2,
      minAllocations: 1,
      allAllocationsPositive: true,
      allocationsSum: 1998000, // ~2000000 - 2000 entry fee
      expectedSharesLessThanNetAmount: true,
      expectedApyRange: { min: 1, max: 30 },
      expectedWarnings: {
        highSlippage: true,
        insufficientLiquidity: true, // Over 1M triggers liquidity warning
        unsupported: false,
      },
      hasValidRoutingPath: true,
    },
  },
  {
    description: "Aggressive strategy deposit (50000 units)",
    input: {
      strategyId: "aggressive-yield",
      amount: 50000,
      token: "USDC",
    },
    expectedOutput: {
      hasEntryFee: true,
      hasNetworkFee: true,
      expectedFeesLength: 2,
      minAllocations: 1,
      allAllocationsPositive: true,
      allocationsSum: 49950,
      expectedSharesLessThanNetAmount: true,
      expectedApyRange: { min: 1, max: 50 }, // Aggressive may have higher APY
      expectedWarnings: {
        highSlippage: false,
        insufficientLiquidity: false,
        unsupported: false,
      },
      hasValidRoutingPath: true,
    },
  },
  {
    description: "Minimum viable deposit (10 units)",
    input: {
      strategyId: "blend-stable",
      amount: 10,
      token: "USDC",
    },
    expectedOutput: {
      hasEntryFee: true,
      hasNetworkFee: true,
      expectedFeesLength: 2,
      minAllocations: 1,
      allAllocationsPositive: true,
      allocationsSum: 10 - 0.01, // ~10 - 0.01 entry fee
      expectedSharesLessThanNetAmount: true,
      expectedApyRange: { min: 0, max: 30 },
      expectedWarnings: {
        highSlippage: false,
        insufficientLiquidity: false,
        unsupported: false,
      },
      hasValidRoutingPath: true,
    },
  },
];

/**
 * Test inputs that should produce warnings or errors.
 */
export const SIMULATOR_EDGE_CASES: SimulatorFixture[] = [
  {
    description: "Zero deposit amount",
    input: {
      strategyId: "blend-stable",
      amount: 0,
      token: "USDC",
    },
    expectedOutput: {
      hasEntryFee: false,
      hasNetworkFee: false,
      expectedFeesLength: 0,
      minAllocations: 0,
      allAllocationsPositive: true,
      allocationsSum: 0,
      expectedSharesLessThanNetAmount: false,
      expectedApyRange: { min: 0, max: 0 },
      expectedWarnings: {
        unsupported: true, // Amount must be > 0
      },
      hasValidRoutingPath: false,
    },
  },
  {
    description: "Negative deposit amount",
    input: {
      strategyId: "blend-stable",
      amount: -1000,
      token: "USDC",
    },
    expectedOutput: {
      hasEntryFee: false,
      hasNetworkFee: false,
      expectedFeesLength: 0,
      minAllocations: 0,
      allAllocationsPositive: true,
      allocationsSum: 0,
      expectedSharesLessThanNetAmount: false,
      expectedApyRange: { min: 0, max: 0 },
      expectedWarnings: {
        unsupported: true, // Amount must be > 0
      },
      hasValidRoutingPath: false,
    },
  },
  {
    description: "Unsupported strategy",
    input: {
      strategyId: "unknown-strategy-xyz",
      amount: 50000,
      token: "USDC",
    },
    expectedOutput: {
      hasEntryFee: true,
      hasNetworkFee: true,
      expectedFeesLength: 2,
      minAllocations: 1,
      allAllocationsPositive: true,
      allocationsSum: 49950,
      expectedSharesLessThanNetAmount: true,
      expectedApyRange: { min: 0, max: 30 },
      expectedWarnings: {
        unsupported: true,
      },
      hasValidRoutingPath: true,
    },
  },
];

/**
 * Helper to validate a simulation result against fixture expectations
 */
export function validateSimulationResult(
  fixture: SimulatorFixture,
  result: any,
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check fees
  if (fixture.expectedOutput.hasEntryFee) {
    const hasEntryFee = result.fees?.some((f: any) => f.type === "Entry Fee");
    if (!hasEntryFee) {
      errors.push("Expected Entry Fee not found");
    }
  }

  if (fixture.expectedOutput.hasNetworkFee) {
    const hasNetworkFee = result.fees?.some((f: any) => f.type === "Network Fee Estimate");
    if (!hasNetworkFee) {
      errors.push("Expected Network Fee not found");
    }
  }

  // Check fees length
  if (result.fees?.length !== fixture.expectedOutput.expectedFeesLength) {
    errors.push(
      `Expected ${fixture.expectedOutput.expectedFeesLength} fees, got ${result.fees?.length}`
    );
  }

  // Check allocations
  if (result.allocations?.length < fixture.expectedOutput.minAllocations) {
    errors.push(
      `Expected at least ${fixture.expectedOutput.minAllocations} allocations, got ${result.allocations?.length}`
    );
  }

  // Check all allocations positive
  const hasNegativeAllocation = result.allocations?.some((a: any) => a.amount < 0);
  if (hasNegativeAllocation) {
    errors.push("Found negative allocation");
  }

  // Check APY range
  const expectedApy = result.postDepositExposure?.expectedApy;
  if (
    expectedApy < fixture.expectedOutput.expectedApyRange.min ||
    expectedApy > fixture.expectedOutput.expectedApyRange.max
  ) {
    errors.push(
      `Expected APY in range [${fixture.expectedOutput.expectedApyRange.min}, ${fixture.expectedOutput.expectedApyRange.max}], got ${expectedApy}`
    );
  }

  // Check warnings
  const warnings = result.warnings || [];
  if (fixture.expectedOutput.expectedWarnings.highSlippage) {
    if (!warnings.some((w: string) => w.includes("slippage"))) {
      errors.push("Expected high slippage warning");
    }
  }

  if (fixture.expectedOutput.expectedWarnings.insufficientLiquidity) {
    if (!warnings.some((w: string) => w.includes("liquidity"))) {
      errors.push("Expected insufficient liquidity warning");
    }
  }

  if (fixture.expectedOutput.expectedWarnings.unsupported) {
    if (!warnings.some((w: string) => w.includes("Amount") || w.includes("Unsupported"))) {
      errors.push("Expected unsupported/amount warning");
    }
  }

  // Check routing
  if (fixture.expectedOutput.hasValidRoutingPath) {
    if (!result.routing?.path || result.routing.path.length === 0) {
      errors.push("Expected valid routing path");
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
