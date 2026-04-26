import { Box, Button, Typography } from "@mui/material"
import { Link } from "react-router"
import { Path } from "@/common/routing/path.ts"

export const PageNotFound = () => {
  return (
    <Box sx={{ py: 8, display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
      <Typography
        variant="h3"
        component="h1"
      >
        404 Page not found
      </Typography>
      <Button
        component={Link}
        to={Path.Main}
        variant="contained"
      >
        Go to main page
      </Button>
    </Box>
  )
}
