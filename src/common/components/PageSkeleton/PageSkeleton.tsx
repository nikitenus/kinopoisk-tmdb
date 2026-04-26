import { Box, Skeleton, Stack } from "@mui/material"

type PageSkeletonProps = {
  variant?: "grid" | "details"
  withSidebar?: boolean
  withSearch?: boolean
  cards?: number
}

const defaultCardCount = 8

export const PageSkeleton = ({
  variant = "grid",
  withSidebar = false,
  withSearch = false,
  cards = defaultCardCount,
}: PageSkeletonProps) => {
  if (variant === "details") {
    return (
      <Box sx={{ maxWidth: 1200, mx: "auto", width: "100%", display: "flex", flexDirection: "column", gap: 2.5 }}>
        <Skeleton variant="text" width={120} height={32} />
        <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" } }}>
          <Skeleton
            variant="rounded"
            sx={{ width: { xs: "100%", md: 360 }, minWidth: { md: 360 }, height: { xs: 420, md: 540 } }}
          />
          <Stack spacing={1.5} sx={{ flex: 1 }}>
            <Skeleton variant="text" width="65%" height={56} />
            <Skeleton variant="text" width="35%" height={32} />
            <Skeleton variant="text" width="40%" height={32} />
            <Skeleton variant="text" width="55%" height={32} />
            <Skeleton variant="text" width="45%" height={32} />
            <Skeleton variant="rounded" width="100%" height={160} sx={{ mt: 1 }} />
          </Stack>
        </Box>
        <Skeleton variant="text" width={180} height={40} />
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" }, gap: 1.5 }}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              height={88}
            />
          ))}
        </Box>
      </Box>
    )
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
      <Skeleton variant="text" width={220} height={48} />
      {withSearch && <Skeleton variant="rounded" width="100%" height={56} />}

      <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" } }}>
        {withSidebar && (
          <Stack spacing={1} sx={{ width: { xs: "100%", md: 260 }, flexShrink: 0 }}>
            <Skeleton variant="text" width="70%" height={34} />
            <Skeleton variant="rounded" width="100%" height={44} />
            <Skeleton variant="rounded" width="100%" height={84} />
            <Skeleton variant="rounded" width="100%" height={180} />
            <Skeleton variant="rounded" width="100%" height={40} />
          </Stack>
        )}

        <Box sx={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 1.5 }}>
          {Array.from({ length: cards }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              height={300}
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}
