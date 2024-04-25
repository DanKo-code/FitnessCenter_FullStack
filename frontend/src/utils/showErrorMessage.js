import { enqueueSnackbar } from "notistack";

export default (error) =>{
    console.log('enqueueSnackbar + error.response: '+JSON.stringify(error.response, null, 2))
  enqueueSnackbar(error.response.data.error, { variant: "error" })}

