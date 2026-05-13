import type { AssignedPlan, Plan, PlanAssignment } from "@/lib/types"

export function isActivePlanAssignment(assignment: PlanAssignment): boolean {
  return assignment.status === "active" && !assignment.endedAt && !assignment.unassignedAt
}

export function toAssignedPlan(plan: Plan, assignment: PlanAssignment): AssignedPlan {
  return {
    ...plan,
    assignment,
    clientId: assignment.clientId,
    startDate: assignment.startedAt ?? assignment.assignedAt,
    endDate: assignment.endedAt,
    isActive: isActivePlanAssignment(assignment),
  }
}

export function getActiveAssignmentByClientId(
  assignments: PlanAssignment[],
  clientId: string
): PlanAssignment | undefined {
  return assignments.find((assignment) => assignment.clientId === clientId && isActivePlanAssignment(assignment))
}

export function getAssignedPlanByClientId(
  plans: Plan[],
  assignments: PlanAssignment[],
  clientId: string
): AssignedPlan | undefined {
  const assignment = getActiveAssignmentByClientId(assignments, clientId)
  if (!assignment) {
    return undefined
  }

  const plan = plans.find((entry) => entry.id === assignment.planId)
  return plan ? toAssignedPlan(plan, assignment) : undefined
}

export function getPublishedPlans(plans: Plan[]): Plan[] {
  return plans.filter((plan) => plan.status === "published")
}

export function getActiveAssignedPlans(
  plans: Plan[],
  assignments: PlanAssignment[]
): AssignedPlan[] {
  return assignments
    .filter(isActivePlanAssignment)
    .map((assignment) => {
      const plan = plans.find((entry) => entry.id === assignment.planId)
      return plan ? toAssignedPlan(plan, assignment) : undefined
    })
    .filter((plan): plan is AssignedPlan => Boolean(plan))
}

export function getPlansByTagSlug(plans: Plan[], tagSlug: string): Plan[] {
  return plans.filter((plan) => plan.tags.some((tag) => tag.slug === tagSlug))
}
