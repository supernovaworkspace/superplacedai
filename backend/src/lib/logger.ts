export function logActivity(user_id: string | null, action: string, metadata: Record<string, unknown>) {
  return {
    user_id,
    action,
    metadata,
    created_at: new Date().toISOString(),
  };
}
