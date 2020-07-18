import styled from 'styled-components'
import { ToastContainer } from "react-toastify"

export const Toast = styled(ToastContainer).attrs({
  autoClose: 3000
})`
  .Toastify__toast-container {}
  .Toastify__toast {}
  .Toastify__toast--error {}
  .Toastify__toast--warning {}
  .Toastify__toast--success {
      background-color:    ${p => p.theme.colors.green};
  }
  .Toastify__toast-body {}
  .Toastify__progress-bar {}
`;
