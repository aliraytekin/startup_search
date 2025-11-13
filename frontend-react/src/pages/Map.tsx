import Grid from "@mui/material/Grid";
import MapView from "../components/Map/MapView"
import StartupsTable from "../components/Startups/StartupsTable";

export default function Map() {
  return (
    <Grid container spacing={2} sx={{
      p: 2
    }}>
      <Grid size={{ xs: 12, md: 12, lg: 6}} sx={{
        display: { xs: 'none', md: 'none', lg: 'block' }
      }}>
        <StartupsTable  />
      </Grid>
      <Grid size={{ xs: 12, md: 12, lg: 6 }}>
        <MapView />
      </Grid>
    </Grid>
  )
}
