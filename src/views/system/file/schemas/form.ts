export function schemas({ classifyId }: { classifyId: number }) {
  return [
    {
      field: 'id',
      show: false,
    },
    {
      field: 'classifyId',
      show: false,
      defaultValue: classifyId,
    },
    {
      component: 'VUpload',
      componentProps: {
      },
      itemProps: {
        labelWidth: 0,
      },
    },
  ]
}
