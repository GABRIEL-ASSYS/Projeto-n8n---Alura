const list = $input.all();
const lines = list.map((e, idx) => {
  const wfName = e.json.workflowName ?? e.json.workflowId ?? idx + 1;
  const error = e.json.error;
  const started = e.json.startedAt ? new Date(e.json.startedAt) : null;

  const msg =
    error?.message ??
    error?.msg ??
    error ??
    "Sem mensagem de erro";

  const startedAt = e.startTime ?? e.started ?? e.startedAtUtc ?? "";
  const id = e.id ?? e.executionId ?? e.json.id ?? (idx + 1);
  return `▶️ ${wfName} (#${id})
Inicio: ${started}`;
});

return [{
  json: {
    msg: `Falhas detectadas (${list.length}):\n\n${lines.join("\n\n")}`
  }
}];