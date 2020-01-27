import 'package:flutter/foundation.dart';

enum Mode { None, Like, Dislike }

class Profile {
  String name;
  List<String> images;
  Mode mode;

  Profile({this.name, this.images, this.mode});
}

class ImageData {
  String label;
  String src;

  ImageData(label, src) {
    this.label = label;
    this.src = 'assets/images/$src';
  }
}

class Store with ChangeNotifier {
  Mode _likeMode = Mode.None;
  List<ImageData> _images = [
    ImageData('Test 1', 'test_1.jpg'),
    ImageData('Test 2', 'test_2.jpg'),
    ImageData('Test 3', 'test_3.jpg')
  ];
  String _name = 'Lorem Ipsum';

  Mode get likeMode => _likeMode;

  set likeMode(Mode value) {
    _likeMode = value == null ? Mode.None : value;
    notifyListeners();
  }

  List<ImageData> get images => _images;

  String get name => _name;

  set name(String value) {
    _name = value;
    notifyListeners();
  }
}
