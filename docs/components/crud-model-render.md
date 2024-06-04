> CrudModelRender 渲染器

## 基本使用

```tsx | react
import { CrudModelRender } from 'lyr-low-code';

export default () => {
  return (
    <CrudModelRender
      type="table"
      schema="ZXhwb3J0JTIwZGVmYXVsdCUyMCU3QiUwQSUyMCUyMHRpdGxlJTNBJTIwJTIyJUU3JTk0JUE4JUU2JTg4JUI3JUU1JTg4JTk3JUU4JUExJUE4JTIyJTJDJTBBJTIwJTIwdG9vbHMlM0ElMjAlNUIlMEElMjAlMjAlMjAlMjAlN0IlMEElMjAlMjAlMjAlMjAlMjAlMjBsYWJlbCUzQSUyMCUyMiVFNiU5NiVCMCVFNSVBMiU5RSVFNyU5NCVBOCVFNiU4OCVCNyUyMiUyQyUwQSUyMCUyMCUyMCUyMCU3RCUyQyUwQSUyMCUyMCU1RCUyQyUwQSUyMCUyMHJlcXVlc3QlM0ElMjBhc3luYyUyMCgpJTIwJTNEJTNFJTIwJTdCJTBBJTIwJTIwJTIwJTIwcmV0dXJuJTIwJTdCJTBBJTIwJTIwJTIwJTIwJTIwJTIwc3VjY2VzcyUzQSUyMHRydWUlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjBsaXN0JTNBJTIwJTVCJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTdCJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwaWQlM0ElMjAxJTJDJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwdXNlck5hbWUlM0ElMjAlMjIlRTUlQkMlQTAlRTQlQjglODklMjIlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjB1c2VyUGhvbmUlM0ElMjAlMjIxMzkyMzc4MzQ3MiUyMiUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMHVzZXJBZ2UlM0ElMjAyMCUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMHVzZXJBZGRyZXNzJTNBJTIwJTIyJUU2JUI1JThCJUU4JUFGJTk1JUU1JTlDJUIwJUU1JTlEJTgwJTIyJTJDJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTdEJTJDJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTVEJTJDJTBBJTIwJTIwJTIwJTIwJTIwJTIwdG90YWwlM0ElMjAxJTJDJTBBJTIwJTIwJTIwJTIwJTdEJTNCJTBBJTIwJTIwJTdEJTJDJTBBJTIwJTIwY29sdW1ucyUzQSUyMCU1QiUwQSUyMCUyMCUyMCUyMCU3QiUwQSUyMCUyMCUyMCUyMCUyMCUyMHRpdGxlJTNBJTIwJTIyJUU3JTk0JUE4JUU2JTg4JUI3JUU1JUE3JTkzJUU1JTkwJThEJTIyJTJDJTBBJTIwJTIwJTIwJTIwJTIwJTIwZGF0YUluZGV4JTNBJTIwJTIydXNlck5hbWUlMjIlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjB3aWR0aCUzQSUyMDIwMCUyQyUwQSUyMCUyMCUyMCUyMCU3RCUyQyUwQSUyMCUyMCUyMCUyMCU3QiUwQSUyMCUyMCUyMCUyMCUyMCUyMHRpdGxlJTNBJTIwJTIyJUU4JTgxJTk0JUU3JUIzJUJCJUU2JTk2JUI5JUU1JUJDJThGJTIyJTJDJTBBJTIwJTIwJTIwJTIwJTIwJTIwZGF0YUluZGV4JTNBJTIwJTIydXNlclBob25lJTIyJTJDJTBBJTIwJTIwJTIwJTIwJTIwJTIwd2lkdGglM0ElMjAyMDAlMkMlMEElMjAlMjAlMjAlMjAlN0QlMkMlMEElMjAlMjAlMjAlMjAlN0IlMEElMjAlMjAlMjAlMjAlMjAlMjB0aXRsZSUzQSUyMCUyMiVFNyU5NCVBOCVFNiU4OCVCNyVFNSVCOSVCNCVFOSVCRSU4NCUyMiUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMGRhdGFJbmRleCUzQSUyMCUyMnVzZXJBZ2UlMjIlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjB3aWR0aCUzQSUyMDIwMCUyQyUwQSUyMCUyMCUyMCUyMCU3RCUyQyUwQSUyMCUyMCUyMCUyMCU3QiUwQSUyMCUyMCUyMCUyMCUyMCUyMHRpdGxlJTNBJTIwJTIyJUU4JUFGJUE2JUU3JUJCJTg2JUU1JTlDJUIwJUU1JTlEJTgwJTIyJTJDJTBBJTIwJTIwJTIwJTIwJTIwJTIwZGF0YUluZGV4JTNBJTIwJTIydXNlckFkZHJlc3MlMjIlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjB3aWR0aCUzQSUyMDIwMCUyQyUwQSUyMCUyMCUyMCUyMCU3RCUyQyUwQSUyMCUyMCU1RCUyQyUwQSUyMCUyMHJvd09wZXJhdGlvbnMlM0ElMjAlN0IlMEElMjAlMjAlMjAlMjB0aXRsZSUzQSUyMCUyMiVFNiU5MyU4RCVFNCVCRCU5QyUyMiUyQyUwQSUyMCUyMCUyMCUyMGZpeGVkJTNBJTIwJTIycmlnaHQlMjIlMkMlMEElMjAlMjAlMjAlMjBzaG93TW9yZSUzQSUyMDQlMkMlMEElMjAlMjAlMjAlMjB3aWR0aCUzQSUyMDE1MCUyQyUwQSUyMCUyMCUyMCUyMG1lbnVzJTNBJTIwKCklMjAlM0QlM0UlMjAlN0IlMEElMjAlMjAlMjAlMjAlMjAlMjByZXR1cm4lMjAlNUIlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlN0IlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBsYWJlbCUzQSUyMCUyMiVFOCVBRiVBNiVFNiU4MyU4NSUyMiUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMGtleSUzQSUyMCUyMnZpZXclMjIlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlN0QlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlN0IlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBsYWJlbCUzQSUyMCUyMiVFNyVCQyU5NiVFOCVCRSU5MSUyMiUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMGtleSUzQSUyMCUyMmVkaXQlMjIlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlN0QlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlN0IlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBsYWJlbCUzQSUyMCUyMiVFNSU4OCVBMCVFOSU5OSVBNCUyMiUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMGtleSUzQSUyMCUyMmRlbGV0ZSUyMiUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMGNvbmZpcm0lM0ElMjAlN0IlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjB0aXRsZSUzQSUyMCUyMiVFNiU4RiU5MCVFNyVBNCVCQSUyMiUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMGNvbnRlbnQlM0ElMjAlMjIlRTYlOTglQUYlRTUlOTAlQTYlRTclQTElQUUlRTglQUUlQTQlRTUlODglQTAlRTklOTklQTQlM0YlMjIlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlN0QlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlN0QlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjAlNUQlM0IlMEElMjAlMjAlMjAlMjAlN0QlMkMlMEElMjAlMjAlN0QlMkMlMEElMjAlMjBzY3JvbGwlM0ElMjAlN0IlMEElMjAlMjAlMjAlMjB4JTNBJTIwODAwJTJDJTBBJTIwJTIwJTdEJTJDJTBBJTIwJTIwc2VhcmNoU2NoZW1hJTNBJTIwJTdCJTBBJTIwJTIwJTIwJTIwY29sdW1uJTNBJTIwMiUyQyUwQSUyMCUyMCUyMCUyMHNjaGVtYSUzQSUyMCU1QiUwQSUyMCUyMCUyMCUyMCUyMCUyMCU3QiUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMHdpZGdldCUzQSUyMCUyMklucHV0JTIyJTJDJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwbGFiZWwlM0ElMjAlMjIlRTglQkUlOTMlRTUlODUlQTUlRTYlQTElODYlMjIlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBuYW1lJTNBJTIwJTIyMzM2NTU2OTMlMjIlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjAlN0QlMkMlMEElMjAlMjAlMjAlMjAlNUQlMkMlMEElMjAlMjAlN0QlMkMlMEElN0QlM0IlMEE="
    />
  );
};
```

## 注入依赖

```jsx | react
import { CrudModelRender } from 'lyr-low-code';

export default () => {
  return (
    <CrudModelRender
      type="form"
      schema="ZXhwb3J0JTIwZGVmYXVsdCUyMCU3QiUwQSUyMCUyMGNvbHVtbiUzQSUyMDIlMkMlMEElMjAlMjB0aXRsZSUzQSUyMCUyMiVFNiU5NiVCMCVFNSVCQiVCQSVFOCVBMSVBOCVFNSU4RCU5NSUyMiUyQyUwQSUyMCUyMHNjaGVtYSUzQSUyMCU1QiUwQSUyMCUyMCUyMCUyMCU3QiUwQSUyMCUyMCUyMCUyMCUyMCUyMHdpZGdldCUzQSUyMCUyMklucHV0JTIyJTJDJTBBJTIwJTIwJTIwJTIwJTIwJTIwbGFiZWwlM0ElMjAlMjIlRTglQkUlOTMlRTUlODUlQTUlRTYlQTElODYlMjIlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjBuYW1lJTNBJTIwJTIyNjM2ODQwNzElMjIlMkMlMEElMjAlMjAlMjAlMjAlN0QlMkMlMEElMjAlMjAlMjAlMjAlN0IlMEElMjAlMjAlMjAlMjAlMjAlMjB3aWRnZXQlM0ElMjAlMjJSYWRpb0dyb3VwJTIyJTJDJTBBJTIwJTIwJTIwJTIwJTIwJTIwbGFiZWwlM0ElMjAlMjIlRTUlOEQlOTUlRTklODAlODklRTclQkIlODQlMjIlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjBwcm9wcyUzQSUyMCU3QiUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMG9wdGlvbnMlM0ElMjAlNUIlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlN0IlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBsYWJlbCUzQSUyMCUyMiVFOSU4MCU4OSVFOSVBMSVCOTElMjIlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjB2YWx1ZSUzQSUyMDElMkMlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlN0QlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlN0IlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBsYWJlbCUzQSUyMCUyMiVFOSU4MCU4OSVFOSVBMSVCOTIlMjIlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjB2YWx1ZSUzQSUyMDIlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlN0QlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlN0IlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBsYWJlbCUzQSUyMCUyMiVFOSU4MCU4OSVFOSVBMSVCOTMlMjIlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjB2YWx1ZSUzQSUyMDMlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlN0QlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlNUQlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjAlN0QlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjBuYW1lJTNBJTIwJTIyNTYyMTMwNzclMjIlMkMlMEElMjAlMjAlMjAlMjAlN0QlMkMlMEElMjAlMjAlMjAlMjAlN0IlMEElMjAlMjAlMjAlMjAlMjAlMjB3aWRnZXQlM0ElMjAlMjJTZWxlY3QlMjIlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjBsYWJlbCUzQSUyMCUyMiVFNCVCOCU4QiVFNiU4QiU4OSVFOSU4MCU4OSUyMiUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMHByb3BzJTNBJTIwJTdCJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwb3B0aW9ucyUzQSUyMCU1QiUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCU3QiUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMGxhYmVsJTNBJTIwJTIyJUU5JTgwJTg5JUU5JUExJUI5MSUyMiUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMHZhbHVlJTNBJTIwMSUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCU3RCUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCU3QiUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMGxhYmVsJTNBJTIwJTIyJUU5JTgwJTg5JUU5JUExJUI5MiUyMiUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMHZhbHVlJTNBJTIwMiUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCU3RCUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCU3QiUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMGxhYmVsJTNBJTIwJTIyJUU5JTgwJTg5JUU5JUExJUI5MyUyMiUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMHZhbHVlJTNBJTIwMyUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCU3RCUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCU1RCUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMCU3RCUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMG5hbWUlM0ElMjAlMjI5NDgzMDE2NyUyMiUyQyUwQSUyMCUyMCUyMCUyMCU3RCUyQyUwQSUyMCUyMCUyMCUyMCU3QiUwQSUyMCUyMCUyMCUyMCUyMCUyMHdpZGdldCUzQSUyMCUyMlRpbWVQaWNrZXIlMjIlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjBsYWJlbCUzQSUyMCUyMiVFNiU5NyVCNiVFOSU5NyVCNCVFNiVBMSU4NiUyMiUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMHByb3BzJTNBJTIwJTdCJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwcGxhY2Vob2xkZXIlM0ElMjAlMjIlRTglQUYlQjclRTklODAlODklRTYlOEIlQTklMjIlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjAlN0QlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjBuYW1lJTNBJTIwJTIyNzk1MjQ4MTElMjIlMkMlMEElMjAlMjAlMjAlMjAlN0QlMkMlMEElMjAlMjAlMjAlMjAlN0IlMEElMjAlMjAlMjAlMjAlMjAlMjB3aWRnZXQlM0ElMjAlMjJSYW5nZVBpY2tlciUyMiUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMGxhYmVsJTNBJTIwJTIyJUU2JTk3JUE1JUU2JTlDJTlGJUU1JThDJUJBJUU5JTk3JUI0JTIyJTJDJTBBJTIwJTIwJTIwJTIwJTIwJTIwbmFtZSUzQSUyMCUyMjY0MjYxMjU4JTIyJTJDJTBBJTIwJTIwJTIwJTIwJTdEJTJDJTBBJTIwJTIwJTIwJTIwJTdCJTBBJTIwJTIwJTIwJTIwJTIwJTIwd2lkZ2V0JTNBJTIwJTIyU3dpdGNoJTIyJTJDJTBBJTIwJTIwJTIwJTIwJTIwJTIwbGFiZWwlM0ElMjAlMjIlRTUlQkMlODAlRTUlODUlQjMlMjIlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjBwcm9wcyUzQSUyMCU3QiUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMGNoZWNrZWRUZXh0JTNBJTIwJTIyJUU2JTg5JTkzJUU1JUJDJTgwJTIyJTJDJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwdW5jaGVja2VkVGV4dCUzQSUyMCUyMiVFNSU4NSVCMyVFOSU5NyVBRCUyMiUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMCU3RCUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMG5hbWUlM0ElMjAlMjIyMTQ1ODExNiUyMiUyQyUwQSUyMCUyMCUyMCUyMCU3RCUyQyUwQSUyMCUyMCU1RCUyQyUwQSU3RCUzQiUwQQ=="
      require={{
        hello: () => {
          console.log('hello');
        },
      }}
    />
  );
};
```