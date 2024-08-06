class PushBox extends GameObject {
    constructor(config) {
        super(config);
    }

    update(state) {
        // Get coordinates which box would be drawn at
        const [cameraAdjustedX, cameraAdjustedY] = utils.cameraAdjustedCoords(this.x, this.y, state.cameraPerson)
        // Apply gravity if not touching the ground (only if on screen)
        if (!this.hitbox.isOnGround(this, state.cameraPerson, state.map) && cameraAdjustedX > 0 && cameraAdjustedX < 512 && cameraAdjustedY > 0 && cameraAdjustedY < 288) {
            this.y += 2;
        }
    }
}

var summaryRanges = function(nums) {
    
    if (nums.length === 0) {
        return [];
    }
    if (nums.length === 1) {
        return [`"${nums[0]}"`];
    }
    let ans = [];
    let currStart = nums[0];
    for (let i=1; i<nums.length; i++) {
        console.log(nums[i])
        if (nums[i] !== nums[i-1] + 1) {
            if (currStart !== nums[i-1]) {
                
                ans += [`"${currStart}->${nums[i-1]}"`];
            } else {
                ans += [`"${currStart}"`];
            }
            currStart = nums[i];
        }
    }
    if (currStart != nums[nums.length - 1]) {
        ans += [`"${currStart}->${nums[nums.length-1]}"`];
    } else {
        ans += [`"${currStart}"`];
    }
    return ans
};
console.log(1 + "")