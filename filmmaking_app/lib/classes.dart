enum Mode { None, Like, Dislike }

class Profile {
  String name;
  List<ImageData> images;
  Mode mode = Mode.None;

  Profile({this.name, this.images, this.mode});

  factory Profile.fromJson(Map<String, dynamic> parsedJson) {
		Mode mode = Mode.None;
		if (parsedJson['mode'] == 'like')
		 mode = Mode.Like;
		 else if (parsedJson['mode'] == 'dislike')
		 mode = Mode.Dislike;

    return Profile(
        name: parsedJson['name'],
        images: (parsedJson['images'] as List).map((image) => ImageData.fromJson(image)).toList(),
        mode: mode);
  }
}

class ImageData {
  String label;
  String src;

  ImageData(label, src) {
    this.label = label;
    this.src = 'assets/images/$src';
  }

  factory ImageData.fromJson(Map<String, dynamic> parsedJson) {
    return ImageData(parsedJson['label'], parsedJson['src']);
  }
}
