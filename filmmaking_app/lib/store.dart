import 'package:flutter/foundation.dart';

enum Mode { None, Like, Dislike }

class Profile {
  String name;
  List<String> images;
  Mode mode;
}

class Store with ChangeNotifier {
  Mode _likeMode = Mode.None;
  String _image = 'test.jpg';
  String _name = 'Lorem Ipsum';

  Mode get likeMode => _likeMode;

  set likeMode(Mode value) {
    _likeMode = value == null ? Mode.None : value;
    notifyListeners();
  }

  String get image => 'assets/images/$_image';

  set image(String value) {
    _image = value;
    notifyListeners();
  }

  String get name => _name;

  set name(String value) {
    _name = value;
    notifyListeners();
  }
}
