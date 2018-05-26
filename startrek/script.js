var getQuote = function(arr) {
  var returnArr = [];
  returnArr.push(arr[Math.round(Math.random() * arr.length)]);
  console.log(returnArr[0]);
  return returnArr;
};
//jquery
$(document).ready(function() {
  var quoteArray = [
    ["... a dream that became a reality and spread throughout the stars.", "CPT James T. Kirk", "Whom Gods Destroy (TOS)", "http://en.memory-alpha.wikia.com/wiki/Whom_Gods_Destroy_(episode)"],
    ["You will die of suffocation, in the icy cold of space.", "Kang", "Day of the Dove (TOS)", "http://en.memory-alpha.wikia.com/wiki/Day_of_the_Dove_(episode)"],
    ["I didn't mean to say that the Enterprise should be hauling garbage. I meant to say that it should be hauled away AS garbage.", "Korax", "The Trouble with Tribbles (TOS)", "http://en.memory-alpha.wikia.com/wiki/The_Trouble_with_Tribbles_(episode)"],
    ["Mr. Spock, the women on your planet are logical. That's the only planet in the galaxy that can make that claim.", "James T. Kirk", "Elaan of Troyius (TOS)", "http://en.memory-alpha.wikia.com/wiki/Elaan_of_Troyius_(episode)"],
    ["Eaten any good books lately?", "Q to Worf", "Deja-Q (TNG)", "http://en.memory-alpha.wikia.com/wiki/Deja_Q_(episode)"],
    ["If you prick me, do I not... leak?", "Data", "The Naked Now (TNG)", "http://en.memory-alpha.wikia.com/wiki/The_Naked_Now_(episode)"],
    ["With the first link, the chain is forged. The first speech censored, the first thought forbidden, the first freedom denied, chains us all irrevocably.", "CPT Jean Luc Picard", "The Drumhead (TNG)", "http://en.memory-alpha.wikia.com/wiki/The_Drumhead_(episode)"],
    ["Captain, we're receiving two hundred and eighty-five thousand hails.", "Wesley Crusher", "Parallels (TNG)", "http://en.memory-alpha.wikia.com/wiki/Parallels_(episode)"],
    ["Space is disease and danger wrapped in darkness and silence.", "Dr. McCoy", "Star Trek (2009)", "http://en.memory-alpha.wikia.com/wiki/Star_Trek_%28film%29"],
    ["Picard would never have hit me...", "Q", "Q-Less (DS9)", "http://en.memory-alpha.wikia.com/wiki/Q-Less_%28episode%29"],
    ["Cardassian rule may have been oppressive, but at least it was simple.", "Odo", "Past Prologue (DS9)", "http://en.memory-alpha.wikia.com/wiki/Past_Prologue_%28episode%29"],
    ["I have a dream; a dream that all people -- human, Jem'Hadar, Ferengi, Cardassians -- will someday stand together in peace... around my Dabo tables.", "Quark", "The Search (DS9)", "http://en.memory-alpha.wikia.com/wiki/The_Search,_Part_I_%28episode%29"],
    ["The truth is usually just an excuse for a lack of imagination.", "Garak", "Improbable Cause (DS9)", "http://en.memory-alpha.wikia.com/wiki/Improbable_Cause_%28episode%29"],
    ["I am a graduate of Starfleet Academy; I know many things.", "Worf", "The Darkness and the Light (DS9)", "http://en.memory-alpha.wikia.com/wiki/The_Darkness_and_the_Light_%28episode%29"],
    ["There's an old saying, Fortune favors the bold. Well, I guess we're about to find out.", "CPT Benjamin Sisko", "Sacrifice of Angels (DS9)", "http://en.memory-alpha.wikia.com/wiki/Sacrifice_of_Angels_%28episode%29"],
    ["At ease, Ensign, before you sprain something.", "CPT Katherine Janeway", "Caretaker (VOY)", "http://en.memory-alpha.wikia.com/wiki/Caretaker_%28episode%29"],
    ["Your first command together was less than successful. You are all dead.", "Tuvok", "Learning Curve (VOY)", "http://en.memory-alpha.wikia.com/wiki/Learning_Curve_%28episode%29"],
    ["Computer, delete Paris.", "The Doctor", "Projections (VOY)", "http://en.memory-alpha.wikia.com/wiki/Projections_%28episode%29"],
    ["Reports of my assimilation are greatly exaggerated.", "CPT Jean Luc Picard", "Star Trek Generations", "http://en.memory-alpha.wikia.com/wiki/Star_Trek_Generations"],
    ["The line must be drawn here! This far, no farther!", "CPT Jean Luc Picard", "Star Trek: Insurrection", "http://en.memory-alpha.wikia.com/wiki/Star_Trek%3A_Insurrection"],
    ["If we're going to be damned, let's be damned for what we really are.", "CPT Jean Luc Picard", "Encounter at Farpoint (TNG)", "http://en.memory-alpha.wikia.com/wiki/Encounter_at_Farpoint_%28episode%29"],
    ["There are times, sir, when men of good conscience cannot blindly follow orders.", "CPT Jean Luc Picard", "The Offspring (TNG)", "http://en.memory-alpha.wikia.com/wiki/The_Offspring_%28episode%29"],
    ["The road from legitimate suspicion to rampant paranoia is very much shorter than we think.", "CPT Jean Luc Picard", "The Drumhead (TNG)", "http://en.memory-alpha.wikia.com/wiki/The_Drumhead_(episode)"],
    ["There are four lights!", "CPT Jean Luc Picard", "Chain of Command (TNG)", "http://en.memory-alpha.wikia.com/wiki/Chain_of_Command%2C_Part_I_%28episode%29"],
    ["It is the unknown that defines our existence. We are constantly searching, not just for answers to our questions, but for new questions.", "CPT Benjamin Sisko", "Emissary (DS9)", "http://en.memory-alpha.wikia.com/wiki/Emissary_%28episode%29"],
    ["Doctor, most people in my experience wouldn’t know reason if it walked up and shook their hand.", "Odo", "Emissary (DS9)", "http://en.memory-alpha.wikia.com/wiki/Emissary_%28episode%29"],
    ["There's coffee in that nebula!", "CPT Katherine Janeway", "The Cloud (VOY)", "http://en.memory-alpha.wikia.com/wiki/The_Cloud_%28episode%29"],
    ["Missing! The captain is missing! It seems I've found myself on the voyage of the damned.", "The Doctor", "Time and Again (VOY)", "http://en.memory-alpha.wikia.com/wiki/Time_and_Again_%28episode%29"],
    ["I'm a doctor, Mr. Neelix, not a decorator.", "The Doctor", "Phage(VOY)", "en.memory-alpha.wikia.com/wiki/Phage_(episode)"],
    ["Fun will now commence.", "Seven of Nine", "Ashes to Ashes (VOY)", "http://en.memory-alpha.wikia.com/wiki/Ashes_to_Ashes_%28episode%29"],
    ["Starfleet could've sent a probe out here to make maps and take pictures, but they didn't. They sent us so that we could explore with our own senses.", "CPT Johnathan Archer", "Civilization (ENT)", "http://en.memory-alpha.wikia.com/wiki/Civilization_%28episode%29"],
    ["With all due respect, Mr. Tuvok, loosen up.", "CPT Katherine Janeway", "Worst Case Scenario (VOY)", "http://en.memory-alpha.wikia.com/wiki/Worst_Case_Scenario_%28episode%29"],
    ["Love is one ailment that is universally untreatable. You'll have to suffer through it.", "Dr. Phlox", "The Aenar", "http://en.memory-alpha.wikia.com/wiki/The_Aenar_%28episode%29"],
    ["So I will learn to live with it...because I can live with it. [pauses] I can live with it. [pauses] Computer, erase that entire personal log.", "CPT Benjamin Sisko", "In the Pale Moonlight (DS9)", "http://en.memory-alpha.wikia.com/wiki/In_the_Pale_Moonlight_(episode)"],
    ["It's a fake!!", "Senator Vreenak", "In the Pale Moonlight (DS9)", "http://en.memory-alpha.wikia.com/wiki/In_the_Pale_Moonlight_(episode)"],
    ["Thank you, captain. Thank you for restoring my faith in the 98th Rule of Acquisition: \'Every man has his price.\'", "Quark", "In the Pale Moonlight (DS9)", "http://en.memory-alpha.wikia.com/wiki/In_the_Pale_Moonlight_(episode)"],
    ["We are Klingons. We don't embrace other cultures, we conquer them.", "General Martok", "You are Cordially Invited", "http://en.memory-alpha.wikia.com/wiki/You_Are_Cordially_Invited_(episode)"],
    ["It's a strange sensation, dying. No matter how many times it happens to you, you never get used to it.", "Ezri Dax", "Afterimage (DS9)", "http://en.memory-alpha.wikia.com/wiki/Afterimage_(episode)"],
    ["Savor the fruit of life, my young friends. The taste is sweet at first, but it turns bitter after a time.", "Kor", "Once More Unto the Breach (DS9)", "http://en.memory-alpha.wikia.com/wiki/Once_More_Unto_the_Breach_(episode)"],
    ["For Cardassia!", "Damar", "What You Leave Behind (DS9)", "http://en.memory-alpha.wikia.com/wiki/What_You_Leave_Behind_(episode)"],
    ["You're the captain of this ship. You haven't the right to be vulnerable in the eyes of the crew. You can't afford the luxury of being anything less than perfect. If you do, they lose faith and you lose command.", "Spock", "The Enemy Within (TOS)", "http://en.memory-alpha.wikia.com/wiki/The_Enemy_Within_(episode)"],
    ["We all have our darker side. We need it; it's half of what we are. It's not really ugly, it's human.", "Dr. McCoy", "The Enemy Within (TOS)", "http://en.memory-alpha.wikia.com/wiki/The_Enemy_Within_(episode)"],
    ["We humans are full of unpredictable emotions that logic cannot solve.", "CPT James T. Kirk", "What Are Little Girls Made Of? (TOS)", "http://en.memory-alpha.wikia.com/wiki/What_Are_Little_Girls_Made_Of%3F_(episode)"],
    ["One of the advantages of being a captain, Doctor, is being able to ask for advice without necessarily having to take it.", "CPT James T. Kirk", "Dagger of the Mind (TOS)", "http://en.memory-alpha.wikia.com/wiki/Dagger_of_the_Mind_(episode)"],
    ["Oh, how absolutely typical of your species! You don't understand something so you become fearful.", "Trelane", "The Squire of Gothos (TOS)", "http://en.memory-alpha.wikia.com/wiki/The_Squire_of_Gothos_(episode)"],
    ["Your logic can be most... annoying.", "CPT James T. Kirk", "Tomorrow is Yesterday (TOS)", "http://en.memory-alpha.wikia.com/wiki/Tomorrow_is_Yesterday_(episode)"],
    ["It is impossible for Captain Kirk to act out of panic or malice. It is not his nature.", "Spock", "Court Martial (TOS)", "http://en.memory-alpha.wikia.com/wiki/Court_Martial_(episode)"],
    ["Diplomats! The best diplomat I know is a fully activated phaser bank.", "Scotty", "A Taste of Armegeddon (TOS)", "http://en.memory-alpha.wikia.com/wiki/A_Taste_of_Armageddon_(episode)"],
    ["Death. Destruction. Disease. Horror. That's what war is all about. That's what makes it a thing to be avoided.", "CPT James T. Kirk", "A Taste of Armegeddon (TOS)", "http://en.memory-alpha.wikia.com/wiki/A_Taste_of_Armageddon_(episode)"],
    ["You speak of courage. Obviously you do not know the difference between courage and foolhardiness. Always it is the brave ones who die, the soldiers.", "Kor", "Errand of Mercy (TOS)", "http://en.memory-alpha.wikia.com/wiki/Errand_of_Mercy_(episode)"],
    ["Pain is a thing of the mind. The mind can be controlled.", "Spock", "Operation -- Annihilate! (TOS)", "http://en.memory-alpha.wikia.com/wiki/Operation_--_Annihilate!_(episode)"],
    ["He's dead, Jim.", "Dr. McCoy", "The Changeling (TOS)", "http://en.memory-alpha.wikia.com/wiki/The_Changeling_(episode)"],
    ["Immortality consists largely of boredom.", "Zefram Cochrane", "Metamorphosis (TOS)", "http://en.memory-alpha.wikia.com/wiki/Metamorphosis_(episode)"],
    ["I'm a doctor, not an escalator", "Dr. McCoy", "Friday's Child (TOS)", "http://en.memory-alpha.wikia.com/wiki/Friday's_Child_(episode)"],
    ["I am superior, sir, in many ways, but I would gladly give it up to be human.", "Data", "Encounter at Farpoint (TNG)", "http://en.memory-alpha.wikia.com/wiki/Encounter_at_Farpoint_(episode)"],
    ["Do not approach me unannounced, especially while I am eating.", "Worf", "Genesis (TNG)", "http://en.memory-alpha.wikia.com/wiki/Genesis_(episode)"],
    ["There is no room in my heart for shame.", "Worf", "Birthright Part II (TNG)", "http://en.memory-alpha.wikia.com/wiki/Birthright%2C_Part_II_(episode)"],
    ["I don't have all the answers; I've never been dead before.", "Ro Laren", "The Next Phase (TNG)", "http://en.memory-alpha.wikia.com/wiki/The_Next_Phase_(episode)"],
    ["The first duty of every Starfleet officer is to the truth, whether it's scientific truth or historical truth or personal truth! It is the guiding principle on which Starfleet is based! If you can't find it within yourself to stand up and tell the truth about what happened, you don't deserve to wear that uniform!", "CPT Jean Luc Picard", "The First Duty (TNG)", "http://en.memory-alpha.wikia.com/wiki/The_First_Duty_(episode)"],
    ["I assume your handprint will open this door whether you are conscious or not.", "Data", "A Matter of Time (TNG)", "http://en.memory-alpha.wikia.com/wiki/A_Matter_of_Time_(episode)"],
    ["Picard and Dathon at El-Adrel.", "Tamarian 1st Officer", "Darmok (TNG)", "http://en.memory-alpha.wikia.com/wiki/Darmok_(episode)"],
    ["In the hands of a con artist, fear can be used to motivate obedience, capitulation, the exploitation of innocent people.", "CPT Jean Luc Picard", "Devil's Due (TNG)", "http://en.memory-alpha.wikia.com/wiki/Devil's_Due_(episode)"],
    ["It's not you I hate, Cardassian. I hate what I became because of you.", "Miles O'Brien", "The Wounded (TNG)", "http://en.memory-alpha.wikia.com/wiki/The_Wounded_(episode)"],
    ["In all trust, there is the possibility for betrayal.", "Riker", "Legacy (TNG)", "http://en.memory-alpha.wikia.com/wiki/Legacy_(episode)"],
    ["The knowledge and experience of the human Picard is part of us now. It has prepared us for all possible courses of action. Your resistance is hopeless... Number One.", "Locutus of Borg", "The Best of Both Worlds (TNG)", "http://en.memory-alpha.wikia.com/wiki/The_Best_of_Both_Worlds_(episode)"],
    ["Thank you for my life.", "Lal", "The Offspring (TNG)", "http://en.memory-alpha.wikia.com/wiki/The_Offspring_(episode)"]
  ];

  $('.generateButton').click(function() {
    var newQuote = getQuote(quoteArray);
    $('.quote').text("\"" + newQuote[0][0] + "\"");
    $('.author').text("- " + newQuote[0][1]);
    $('.link').text(newQuote[0][2]);
    $('.link').attr('href', newQuote[0][3]);
    $('.tweet').attr('href', "https://twitter.com/intent/tweet?text=\"" + newQuote[0][0] + "\" - " + newQuote[0][1]);
  })
  $('.tweet').click(function(event) {
    var width = 575,
      height = 400,
      left = ($(window).width() - width) / 2,
      top = ($(window).height() - height) / 2,
      url = this.href,
      opts = 'status=1' +
      ',width=' + width +
      ',height=' + height +
      ',top=' + top +
      ',left=' + left;
    window.open(url, 'twitter', opts);
    return false;
  })
});
