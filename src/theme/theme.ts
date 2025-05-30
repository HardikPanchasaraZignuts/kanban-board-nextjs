import { createTheme } from "@mui/material";

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 575,
            md: 767,
            lg: 991,
            xl: 1199,
        }
    }
})

export default theme;