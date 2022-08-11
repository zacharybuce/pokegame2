const ar = [11, 2, 4, 51, 93, 45, 8, 93, 2, 3, 1];
let ar2 = [];
let nums = [];

for (let i = 0; i < ar.length; i++) {
  if (!ar2[ar[i]]) ar2[ar[i]] = 1;
  else ar2[ar[i]] += 1;
}

for (let index = 0; index < ar2.length; index++) {
  if (ar2[index])
    for (let j = 0; j < ar2[index]; j++) {
      nums.push(index);
    }
}

console.log(nums[nums.length / 2]);
