"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarClock, Plus, X } from "lucide-react";
import { toast } from "sonner";

import { ConfirmationDialog } from "@/components/common/confirmation-dialog";
import { PageHeader } from "@/components/common/page-header";
import { TagItem } from "@/components/common/tag-item";
import { TagPickerDialog } from "@/components/common/tag-picker-dialog";
import { PlanDocumentView } from "@/app/[locale]/nutritionist/_components/plan-document-view";
import { ClientDetailSection } from "@/app/[locale]/nutritionist/_components/client-detail-section";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllClients, getClientDetailById } from "@/lib/data/mock-clients";
import {
  getAllPlanTags,
  getPlanAssignmentsByPlanId,
  getPlanById,
} from "@/lib/data/mock-plans";
import { getTranslations, type Locale } from "@/lib/i18n";
import type { Client, PlanAssignment, PlanStatus, PlanTag } from "@/lib/types";

const PLAN_STATUS_OPTIONS: PlanStatus[] = ["draft", "published", "archived"];

type EditableAssignment = Pick<
  PlanAssignment,
  "clientId" | "assignedAt" | "startedAt" | "status"
>;

type EditablePlan = {
  name: string;
  description: string;
  status: PlanStatus;
  tags: PlanTag[];
};

type ClientOption = {
  value: string;
  label: string;
  subtitle: string;
  searchText: string;
};

interface PlanDetailClientProps {
  locale: string;
  planId: string;
}

function toSearchText(client: Client) {
  return [client.name, client.email, client.phone]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function mergeTags(first: PlanTag[], second: PlanTag[]) {
  const tagsById = new Map<string, PlanTag>();

  for (const tag of [...first, ...second]) {
    tagsById.set(tag.id, tag);
  }

  return [...tagsById.values()];
}

export function PlanDetailClient({ locale, planId }: PlanDetailClientProps) {
  const router = useRouter();
  const t = getTranslations("nutritionist", locale as Locale);
  const plan = getPlanById(planId);

  const initialAssignments = useMemo<EditableAssignment[]>(() => {
    if (!plan) {
      return [];
    }

    return getPlanAssignmentsByPlanId(plan.id)
      .filter(
        (assignment) =>
          assignment.status === "active" &&
          !assignment.endedAt &&
          !assignment.unassignedAt,
      )
      .map((assignment) => ({
        clientId: assignment.clientId,
        assignedAt: assignment.assignedAt,
        startedAt: assignment.startedAt,
        status: assignment.status,
      }));
  }, [plan]);

  const [draftPlan, setDraftPlan] = useState<EditablePlan | null>(() =>
    plan
      ? {
          name: plan.name,
          description: plan.description ?? "",
          status: plan.status,
          tags: plan.tags,
        }
      : null,
  );
  const [savedPlan, setSavedPlan] = useState<EditablePlan | null>(draftPlan);
  const [assignments, setAssignments] =
    useState<EditableAssignment[]>(initialAssignments);
  const [savedAssignments, setSavedAssignments] =
    useState<EditableAssignment[]>(initialAssignments);
  const [isEditing, setIsEditing] = useState(false);
  const [clientSearch, setClientSearch] = useState("");
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false);
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tagLibrary, setTagLibrary] = useState<PlanTag[]>(() =>
    plan ? mergeTags(getAllPlanTags(), plan.tags) : getAllPlanTags(),
  );

  if (!plan || !draftPlan || !savedPlan) {
    return null;
  }

  const statusLabels = t.plans.detail.fields.statusValues;
  const availableClients = getAllClients();
  const assignedClientIds = new Set(
    assignments.map((assignment) => assignment.clientId),
  );
  const unassignedClientOptions: ClientOption[] = availableClients
    .filter((client) => !assignedClientIds.has(client.id))
    .map((client) => ({
      value: client.id,
      label: client.name,
      subtitle: client.email ?? client.phone ?? client.id,
      searchText: toSearchText(client),
    }));

  const normalizedClientQuery = clientSearch.trim().toLowerCase();
  const filteredClientOptions = normalizedClientQuery
    ? unassignedClientOptions.filter((client) =>
        client.searchText.includes(normalizedClientQuery),
      )
    : [];

  const visibleAssignments = assignments.map((assignment) => {
    const client = getClientDetailById(assignment.clientId);
    return {
      assignment,
      client,
    };
  });

  const handleEnableEdit = () => {
    setDraftPlan(savedPlan);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!draftPlan.name.trim()) {
      return;
    }

    try {
      setSavedPlan(draftPlan);
      setSavedAssignments(assignments);
      setIsEditing(false);
      setClientSearch("");
      setIsTagDialogOpen(false);
      toast.success(t.plans.feedback.saveSuccess);
    } catch {
      toast.error(t.plans.feedback.operationError);
    }
  };

  const handleCancel = () => {
    setDraftPlan(savedPlan);
    setAssignments(savedAssignments);
    setIsEditing(false);
    setClientSearch("");
    setIsTagDialogOpen(false);
  };

  const handleArchive = async () => {
    try {
      setDraftPlan((current) =>
        current ? { ...current, status: "archived" } : current,
      );
      setSavedPlan((current) =>
        current ? { ...current, status: "archived" } : current,
      );
      setIsEditing(false);
      setArchiveDialogOpen(false);
      toast.success(t.plans.feedback.archiveSuccess);
    } catch {
      toast.error(t.plans.feedback.operationError);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleteDialogOpen(false);
      setIsEditing(false);
      toast.success(t.plans.feedback.deleteSingleSuccess);
      router.push(`/${locale}/nutritionist/plans`);
    } catch {
      toast.error(t.plans.feedback.operationError);
    }
  };

  const addClient = (clientId: string) => {
    if (assignedClientIds.has(clientId)) {
      return;
    }

    setAssignments((current) => [
      ...current,
      {
        clientId,
        assignedAt: new Date(),
        startedAt: new Date(),
        status: "active",
      },
    ]);
    setClientSearch("");
  };

  const removeClient = (clientId: string) => {
    setAssignments((current) =>
      current.filter((assignment) => assignment.clientId !== clientId),
    );
  };

  const addTags = (tags: PlanTag[]) => {
    if (tags.length === 0) {
      return;
    }

    setTagLibrary((current) => mergeTags(current, tags));
    setDraftPlan((current) => {
      if (!current) {
        return current;
      }

      return {
        ...current,
        tags: mergeTags(current.tags, tags),
      };
    });
  };

  const createTag = (name: string) => {
    const trimmedName = name.trim();
    const now = new Date();

    return {
      id: `tag-custom-${trimmedName.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')}-${now.getTime()}`,
      nutritionistId: plan.nutritionistId,
      name: trimmedName,
      slug: trimmedName.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-'),
      color: 'slate',
      createdAt: now,
      updatedAt: now,
    } satisfies PlanTag;
  };

  const removeTag = (tagId: string) => {
    setDraftPlan((current) =>
      current
        ? {
            ...current,
            tags: current.tags.filter((tag) => tag.id !== tagId),
          }
        : current,
    );
  };

  const pageActions = isEditing ? (
    <>
      <Button variant="outline" size="sm" onClick={handleCancel}>
        {t.plans.confirmations.cancel}
      </Button>
      <Button size="sm" onClick={handleSave} disabled={!draftPlan.name.trim()}>
        {t.common.actions.save}
      </Button>
    </>
  ) : (
    <>
      <Button size="sm" variant="outline" onClick={handleEnableEdit}>
        {t.plans.actions.edit}
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => setArchiveDialogOpen(true)}
      >
        {t.plans.actions.archive}
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="text-destructive hover:text-destructive"
        onClick={() => setDeleteDialogOpen(true)}
      >
        {t.plans.actions.delete}
      </Button>
    </>
  );

  const mobileActions = isEditing ? (
    <>
      <DropdownMenuItem onClick={handleSave}>
        {t.common.actions.save}
      </DropdownMenuItem>
      <DropdownMenuItem onClick={handleCancel}>
        {t.plans.confirmations.cancel}
      </DropdownMenuItem>
    </>
  ) : (
    <>
      <DropdownMenuItem onClick={handleEnableEdit}>
        {t.plans.actions.edit}
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setArchiveDialogOpen(true)}>
        {t.plans.actions.archive}
      </DropdownMenuItem>
      <DropdownMenuItem
        variant="destructive"
        onClick={() => setDeleteDialogOpen(true)}
      >
        {t.plans.actions.delete}
      </DropdownMenuItem>
    </>
  );

  const titleNode = isEditing ? (
    <Input
      value={draftPlan.name}
      onChange={(event) =>
        setDraftPlan((current) =>
          current ? { ...current, name: event.target.value } : current,
        )
      }
      className="h-auto w-full border-0 bg-transparent px-0 py-0 text-3xl font-bold tracking-tight text-foreground shadow-none md:min-w-[40vw] focus-visible:border-transparent focus-visible:ring-0"
    />
  ) : (
    plan.name
  );

  const descriptionNode = isEditing ? (
    <Input
      value={draftPlan.description}
      onChange={(event) =>
        setDraftPlan((current) =>
          current ? { ...current, description: event.target.value } : current,
        )
      }
      placeholder={t.plans.detail.fields.description}
      className="h-auto w-full border-0 bg-transparent px-0 py-0 text-sm text-foreground/60 shadow-none md:min-w-[40vw] focus-visible:border-transparent focus-visible:ring-0"
    />
  ) : (
    (plan.description ?? plan.summary)
  );

  return (
    <>
      <div className="space-y-6">
        <div className="space-y-2">
          <PageHeader
            title={titleNode}
            description={descriptionNode}
            actions={pageActions}
            mobileActions={mobileActions}
          />
          <p className="text-xs text-muted-foreground">
            {t.plans.detail.fields.updatedAt}:{" "}
            {plan.updatedAt.toLocaleDateString(locale)}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card className="border-border/60 bg-background/60">
            <CardHeader className="pb-3">
              <CardDescription>{t.plans.detail.fields.status}</CardDescription>
              {isEditing ? (
                <Select
                  value={draftPlan.status}
                  onValueChange={(value) =>
                    setDraftPlan((current) =>
                      current
                        ? { ...current, status: value as PlanStatus }
                        : current,
                    )
                  }
                >
                  <SelectTrigger className="w-full md:min-w-[40%]">
                    <SelectValue placeholder={t.plans.detail.fields.status}>
                      {statusLabels[draftPlan.status]}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {PLAN_STATUS_OPTIONS.map((status) => (
                      <SelectItem key={status} value={status}>
                        {statusLabels[status]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <CardTitle className="text-base">
                  {statusLabels[plan.status]}
                </CardTitle>
              )}
            </CardHeader>
          </Card>

          <Card className="border-border/60 bg-background/60">
            <CardHeader className="space-y-3 pb-3">
              <div className="flex items-center justify-between gap-2">
                <CardDescription>{t.plans.tags.header}</CardDescription>
                {isEditing ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label={t.plans.tags.dialog.open}
                    onClick={() => setIsTagDialogOpen(true)}
                  >
                    <Plus className="size-4" />
                  </Button>
                ) : null}
              </div>

              {draftPlan.tags.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  {t.plans.tags.emptyState}
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {draftPlan.tags.map((tag) => (
                    <div
                      key={tag.id}
                      className="inline-flex items-center gap-1"
                    >
                      <TagItem
                        tag={tag}
                        mode={isEditing ? "editable" : "readonly"}
                        labels={{
                          title: t.plans.tags.header,
                          description: t.plans.tags.hint,
                          name: t.plans.tags.fields.name,
                          color: t.plans.tags.fields.color,
                          colors: t.plans.tags.colors,
                          save: t.plans.tags.actions.save,
                          cancel: t.plans.tags.actions.cancel,
                          saved: t.plans.tags.help,
                        }}
                        onChange={(nextTag) => {
                          setTagLibrary((current) =>
                            mergeTags(current, [nextTag]),
                          );
                          setDraftPlan((current) =>
                            current
                              ? {
                                  ...current,
                                  tags: current.tags.map((item) =>
                                    item.id === nextTag.id ? nextTag : item,
                                  ),
                                }
                              : current,
                          );
                        }}
                      />

                      {isEditing ? (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          className="h-7 w-7"
                          aria-label={`${t.plans.tags.actions.remove} ${tag.name}`}
                          onClick={() => removeTag(tag.id)}
                        >
                          <X className="size-3.5" />
                        </Button>
                      ) : null}
                    </div>
                  ))}
                </div>
              )}
            </CardHeader>
          </Card>
        </div>

        <ClientDetailSection
          title={t.plans.detail.sections.assignments}
          description={t.plans.detail.sections.assignmentsDescription}
        >
          {isEditing ? (
            <div className="space-y-4">
              <Combobox<ClientOption>
                value={null}
                items={unassignedClientOptions}
                filteredItems={filteredClientOptions}
                inputValue={clientSearch}
                itemToStringLabel={(item) => item.label}
                itemToStringValue={(item) => item.value}
                onInputValueChange={(nextValue) => setClientSearch(nextValue)}
                onValueChange={(selectedClient) => {
                  if (selectedClient) {
                    addClient(selectedClient.value);
                  }
                }}
              >
                <ComboboxInput
                  placeholder={t.plans.search.placeholder}
                  className="w-full md:w-[40%]"
                  showClear={Boolean(clientSearch)}
                />
                <ComboboxContent>
                  <ComboboxEmpty>
                    {t.plans.detail.emptyStates.noMatchingClients}
                  </ComboboxEmpty>
                  <ComboboxList>
                    <ComboboxCollection>
                      {(client: ClientOption) => (
                        <ComboboxItem key={client.value} value={client}>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-foreground">
                              {client.label}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {client.subtitle}
                            </span>
                          </div>
                        </ComboboxItem>
                      )}
                    </ComboboxCollection>
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>

              <div className="space-y-3">
                {visibleAssignments.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    {t.plans.detail.emptyStates.noAssignments}
                  </p>
                ) : (
                  visibleAssignments.map(({ assignment, client }) => (
                    <div
                      key={assignment.clientId}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border/50 p-3"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {client?.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {client?.email ?? client?.phone ?? client?.id}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <CalendarClock className="size-3.5" />
                          {t.plans.detail.fields.startDate}:{" "}
                          {assignment.startedAt?.toLocaleDateString(locale) ??
                            assignment.assignedAt.toLocaleDateString(locale)}
                        </p>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => removeClient(assignment.clientId)}
                        >
                          <X className="size-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : visibleAssignments.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              {t.plans.detail.emptyStates.noAssignments}
            </p>
          ) : (
            <div className="space-y-3">
              {visibleAssignments.map(({ assignment, client }) => (
                <div
                  key={assignment.clientId}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border/50 p-3"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {client?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {client?.email ?? client?.phone ?? client?.id}
                    </p>
                  </div>
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarClock className="size-3.5" />
                    {t.plans.detail.fields.startDate}:{" "}
                    {assignment.startedAt?.toLocaleDateString(locale) ??
                      assignment.assignedAt.toLocaleDateString(locale)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </ClientDetailSection>

        <ClientDetailSection
          title={t.plans.detail.sections.document}
          description={
            plan.summary ??
            plan.contentText ??
            t.plans.detail.emptyStates.noContent
          }
        >
          {plan.contentJson.content.length > 0 ? (
            <PlanDocumentView
              content={plan.contentJson}
              className="rounded-lg border border-border/50 p-4"
            />
          ) : (
            <p className="text-sm text-muted-foreground">
              {t.plans.detail.emptyStates.noContent}
            </p>
          )}
        </ClientDetailSection>
      </div>

      <TagPickerDialog
        open={isTagDialogOpen}
        onOpenChange={setIsTagDialogOpen}
        labels={{
          title: t.plans.tags.dialog.title,
          description: t.plans.tags.dialog.description,
          searchPlaceholder: t.plans.tags.dialog.searchPlaceholder,
          emptyState: t.plans.tags.dialog.emptyState,
          selectedEmptyState: t.plans.tags.dialog.selectedEmptyState,
          selectedSummary: t.plans.tags.dialog.selectedSummary,
          create: t.plans.tags.dialog.create,
          add: t.plans.tags.dialog.add,
          cancel: t.plans.tags.dialog.cancel,
          confirm: t.plans.tags.dialog.confirm,
        }}
        availableTags={tagLibrary}
        initialSelectedTags={draftPlan.tags}
        onCreateTag={createTag}
        onConfirmTags={addTags}
      />

      <ConfirmationDialog
        open={archiveDialogOpen}
        onOpenChange={setArchiveDialogOpen}
        title={t.plans.confirmations.archiveTitle}
        description={t.plans.confirmations.archiveDescription}
        confirmLabel={t.plans.confirmations.archiveConfirm}
        cancelLabel={t.plans.confirmations.cancel}
        onConfirm={handleArchive}
        destructive={false}
      />

      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title={t.plans.confirmations.deleteTitle}
        description={t.plans.confirmations.deleteDescription.replace(
          "{count}",
          "1",
        )}
        confirmLabel={t.plans.confirmations.deleteConfirm}
        cancelLabel={t.plans.confirmations.cancel}
        onConfirm={handleDelete}
        destructive
      />
    </>
  );
}
