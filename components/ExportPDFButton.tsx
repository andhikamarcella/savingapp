'use client'

import jsPDF from 'jspdf'
import { formatCurrency } from '@/lib/currencyFormatter'
import type { Goal } from '@/lib/types'

export const exportGoalPDF = (goal: Goal) => {
  const doc = new jsPDF()
  doc.setFontSize(18)
  doc.text('Saving Report', 14, 18)
  doc.setFontSize(12)
  doc.text(`Goal: ${goal.emoji} ${goal.title}`, 14, 30)
  doc.text(`Target: ${formatCurrency(goal.targetAmount, goal.currency)}`, 14, 38)
  doc.text(`Saved: ${formatCurrency(goal.savedAmount, goal.currency)}`, 14, 46)
  doc.text(`Remaining: ${formatCurrency(goal.targetAmount - goal.savedAmount, goal.currency)}`, 14, 54)
  doc.text(`Target Date: ${new Date(goal.targetDate).toLocaleDateString()}`, 14, 62)
  doc.text(`Plan Type: ${goal.planType}`, 14, 70)
  doc.text('Transactions:', 14, 82)

  let y = 90
  goal.transactions.forEach((tx) => {
    doc.text(`${new Date(tx.date).toLocaleString()} | ${tx.type} | ${formatCurrency(tx.amount, goal.currency)} | ${tx.note || '-'}`, 14, y)
    y += 8
    if (y > 275) {
      doc.addPage()
      y = 20
    }
  })

  doc.save('saving-report.pdf')
}

export const ExportPDFButton = ({ goal }: { goal: Goal }) => (
  <button className="btn-secondary" onClick={() => exportGoalPDF(goal)}>
    Export PDF
  </button>
)
