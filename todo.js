// ********************************** HIGH **********************************
// 0. There should be feature that saves user preferences/settings inside user? or some other Schema, so it will sync between devices
// 1. Visual representation of what has been changed in solve. If it's DNF, +2. There is no info if used clicked that properly
// 2. add "Warmup" mode where solves are not saved
// 3. add image of scrambled cube
// 5. Session modal - session item should be pressable with ability to change name
// 6. When user switch Inspection time in timer settings, it should show additional settings, like modal with TextInput to pass seconds of inspection, switch for notification of time passing(50% and 80%). User can set it to Vibration or Sound alert or both at once
// 7. Add "Tryb ręczny" to timer, so instead of time - it will show big text input to add time, possibly with only numbers, and user will write them in one take like user writes "11245" and it shows it like "11.245". User could choose if he will write all ms or just .00ms. There should be checkbox if should save current scramble or not. Also it should have ModifyResultBlock to add penalties to solve(without delete)
// 8. Add option to choose "Ready signal", so timer will somehow show user that it is ready to count time. Maybe color some parts of screen/change time color
// 9. Each sessions should store best time so app will not need to cycle through all times
// 10. Timer should have some nice animation in background when user breaks his best record in this session. It should count in all sessions starting from X time(not for first X times, because that is pointless). It should also show "Gratulacje, Pobiłeś swój rekord o X:xx!"
// 11. Timer should also point if there is "Nowa najlepsza średnia" with current solve. If yes - on time somehow pop average that is best rn and show some info above?
// 3. set finished when there is any gyro - Add options to timer settings, if on - use gyro.

// ********************************** MODERATE **********************************
// 1. Statistics based on days, not counting every solve?
// 2. set ready when front camera is covered?
// 4. Export to CSV/ import/export compatible with csTimer
// 5. maybe add option to create own colors for whole app? and background image for timer screen? It should be dimmed by default
// 6. add "custom" cube option so users can add their own cube without scramble/ Maybe add "custom" and users will place there their sessions?
// 7. add by default more categories, like bld, multi blind
// 8. maybe create one big context with all data and reducers or REDUX? Or create one component that will provide all at once
// 9. work on implementing a great time adding feature, so it will be easy for ppl to use stackmats
// 10. read about connecting bluetooth cubes/stackmat timers to app?
// 11. ability to use the same scramble as before solve?
// 12. ability to change amount of moves in scramble?
// 13. history of PB's - how they changed/fast overtime
// 15. Two way binding between firestore and realm database - userId/firebase UID
// 16. Sessions should have some icons? User could pick predefined icon
// 17. If users adds time, and click "do not use this scramble" - maybe let him paste his own scramble?

// ********************************** LOW **********************************
// 1. think about Adding sounds to app>?
// 2. Timer numbers turns to yellow/red when you exceeds your avg5/avg12 time?
// 3. Timer shows only full seconds, without any milliseconds
// 4. maybe 3 presets for how long to tap screen to start solve?
// 5. Read about not dimming screen/ not blocking screen while in use
// 6. Splash screen should be really looking good. It should have some kind of fading effect, animation should start when all assets are done fetching. Should use animated to do this.
// 7. OLL/PLL trainer, where user can choose one of X algs for each case, add his own alg, train one/all selected at the same time
// 8. More advanced trainers like  VLS cases, ZBLL, and OLLCP
// 9. Multiphase timing feature, which lets you count each step in solve
// 10. Customization of AVG/MEANS to exact numbers which user chooses, not only to predefined ones
// 11. Daily statistics of solves, which shows avg of solves today
// 12. Scrambling trainer?

const arr = [
    {
        _id: [ObjectId],
        amount: 0,
        average: 0,
        cube: '333',
        name: 'New session 1',
        owner_id: [ObjectId],
        solves: [Array],
        used: '2023-09-09T15:00:24.807Z',
    },
    {
        _id: [ObjectId],
        amount: 0,
        average: 0,
        cube: '333',
        name: 'New session 1',
        owner_id: [ObjectId],
        solves: [Array],
        used: '2023-09-09T15:00:29.341Z',
    },
    {
        _id: [ObjectId],
        amount: 0,
        average: 0,
        cube: '333',
        name: 'New session 1',
        owner_id: [ObjectId],
        solves: [Array],
        used: '2023-09-09T15:05:01.132Z',
    },
];
