import { ArrowBack } from '@mui/icons-material'
import { Container, IconButton, Paper, Typography } from '@mui/material'
import React from 'react'

const TenantHeader = ({ title, back = false }) => {
  const goBack = () => {
    window.history.back()
  }
  return (
    <Paper elevation={4} sx={{ py: 2, mb: 3, position: "sticky", top: 0, zIndex: 2 }}>
      <Container sx={{ display: "flex", alignItems: "center" }}>
        {back && (
          <IconButton onClick={goBack}>
            <ArrowBack />
          </IconButton>
        )}
        <Typography onClick={back ? goBack : null} variant="h5" fontWeight={500}>
          {title}
        </Typography>
      </Container>
    </Paper>
  )
}

export default TenantHeader