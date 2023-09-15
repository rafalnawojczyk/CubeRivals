// ********************************** HIGH **********************************
// 0. There should be feature that saves user preferences/settings inside user? or some other Schema, so it will sync between devices
// 3. add image of scrambled cube  https://github.com/tdecker91/puzzle-gen
// 8. Add option to choose "Ready signal", so timer will somehow show user that it is ready to count time. Maybe color some parts of screen/change time color
// 10. Timer should have some nice animation in background when user breaks his best record in this session. It should count in all sessions starting from X time(not for first X times, because that is pointless). It should also show "Gratulacje, Pobiłeś swój rekord o X:xx!"
// 11. Timer should also point if there is "Nowa najlepsza średnia" with current solve. If yes - on time somehow pop average that is best rn and show some info above?
// 12. set finished when there is any gyro - Add options to timer settings, if on - use gyro.
// 13. Add sorting/filtering in times list, so user can sort it by date/time/show solves from specific date only, filter by flags?, sort by inspection times length? sort by ratio inspectionTime to solveTime?
// 14. Add search bar in times list to search by comments.
// 15. Add possibility to user to add his own cubes, so he can assign each solve to a certain cube(like X-man tornado and so on) so it will be easier to filter by cube also
// 16. Try to implement better scramble generator: Scramble: https://github.com/cubing/create-cubing-app / https://js.cubing.net/cubing/
// 17. Add feature that lets user choose inspection alerts audio and vibration patterns
// 18. In times list when user longPress any of times - it changes their look and adds checkbox to all of them. User can easily check all times and move them to another session/cube
// 19. Add possibility to add new "cubes" to timer, maybe they should be separated by horizontal line. User can name them as he wants, pick any scramble generator(or no scrambler), choose icon, maybe even choose multiple scrambles together for relays?
// 20. Add 'star' functionality to solves, so user can star some solves and then filter by starred in timesList.
// 21. Try to make SolveModifiers icons bigger, so user will not start new solve accidentaly?
// 22. Maybe add small X on top of inspection, so user can stop inspection without changing scramble?
// 23. Statistics should be zoomable(zooming in, moving around, changing the Y axis)
// 24. Changing arrangement of elements in timer, maybe putting scramble down instead of above timer - to not be hidden behind notifications?
// 25. While adding notes - let user predefine some notes and show them as a clickable buttons. So user can add 'lucky scramble' 'great solve' 'great cross' and stuff like that so he doesnt need to write these things all the time

// ********************************** MODERATE **********************************
// 2. Set ready when front light sensor is covered.
// 4. Export to CSV/ import/export compatible with csTimer
// 5. maybe add option to create own colors for whole app? and background image for timer screen? It should be dimmed by default
// 6. add "custom" cube option so users can add their own cube without scramble/ Maybe add "custom" and users will place there their sessions?
// 7. add by default more categories, like bld, multi blind
// 10. read about connecting bluetooth cubes/stackmat timers to app?
// 11. ability to use the same scramble as before solve?
// 12. ability to change amount of moves in scramble?
// 13. history of PB's - how they changed/fast overtime
// 16. Sessions should have some icons? User could pick predefined icon
// 17. If users adds time, and click "do not use this scramble" - maybe let him paste his own scramble?
// 18. When clicking on rolling averages - user can choose if he wants to count best/worse 5% of solves in averages, all ao5/ao12 would have checkbox if user wants to see them, place where user can add his own numbers?
// If it is set to hideUI - hide navigation bar as well.

// ********************************** LOW **********************************
// 2. Timer numbers turns to yellow/red when you exceeds your avg5/avg12 time?
// 3. Timer shows only full seconds, without any milliseconds
// 4. maybe 3 presets for how long to tap screen to start solve?
// 5. Dimm screen down while solving?
// 6. Splash screen should be really looking good. It should have some kind of fading effect, animation should start when all assets are done fetching. Should use animated to do this.
// 7. OLL/PLL trainer, where user can choose one of X algs for each case, add his own alg, train one/all selected at the same time
// 7a. OLL/PLL trainers should have predefined sets of algs that top speedcubers uses, and maybe options to revert them from 180deg angle?
// 8. More advanced trainers like  VLS cases, ZBLL, and OLLCP
// 9. Multiphase timing feature, which lets you count each step in solve
// 10. Customization of AVG/MEANS to exact numbers which user chooses, not only to predefined ones
// 11. Daily statistics of solves, which shows avg of solves today
// 12. Scrambling trainer?
// 13. Let user choose vibration patterns and sound alerts in inspection settings
// 14. use expo storeReview package o ask for review after X solves? save in user that app asked for that already
// 15. Maybe create some walkthrough tutorials in app or maybe in form of video? About all features?
// 16. Add special tab where users will see scrambles that will produce nice looking patterns on cubes. Especially big cubes are interesting
// 17. Add easy scramble submission?
// 18. Add trainers for ROUX
