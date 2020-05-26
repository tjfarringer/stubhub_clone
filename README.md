# stubhub_clone

User-tbl:
email, pw

Ticket-tbl:
title
price
userId
orderId

Order-tbl:
userId
status
ticketId
expiresAt

Charge-tbl:
orderId
status (created, cancelled, awaitingpayment, completed)
amount
stripeId
stripeRefundId
